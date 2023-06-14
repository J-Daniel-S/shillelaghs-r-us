package shillelaghsRUs.controllers;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import shillelaghsRUs.entities.Customer;
import shillelaghsRUs.entities.Order;
import shillelaghsRUs.entities.Shillelagh;
import shillelaghsRUs.exceptions.NoSuchOrderException;
import shillelaghsRUs.exceptions.OrderChangeFailedException;
import shillelaghsRUs.exceptions.ShillelaghUnavailableException;
import shillelaghsRUs.services.CustomerService;
import shillelaghsRUs.services.OrderService;
import shillelaghsRUs.services.ShillelaghService;

import org.springframework.web.bind.annotation.RequestMethod;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = { RequestMethod.POST, RequestMethod.GET,
		RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS })
public class OrderController {

	@Autowired
	private OrderService oRepo;

	@Autowired
	private CustomerService cusRepo;

	@Autowired
	private ShillelaghService shiRepo;

	@GetMapping("/{id}")
	public ResponseEntity<Order> getOrderById(@PathVariable long id) {
		if (oRepo.exists(id)) {
			return ResponseEntity.status(HttpStatus.FOUND).body(oRepo.findById(id));
		} else {
			throw new NoSuchOrderException("Order not found: id-" + id);
		}
	}

	@GetMapping
	public ResponseEntity<List<Order>> getAllOrders() {
		return ResponseEntity.status(HttpStatus.OK).body(oRepo.findAll());
	}

	@GetMapping("/customer/{id}")
	public ResponseEntity<List<Order>> getOrders(@PathVariable("id") long customerId) {
		if (cusRepo.exists(customerId)) {
			List<Order> orders = oRepo.findByCustomer(customerId);
			return ResponseEntity.status(HttpStatus.FOUND).body(orders);
		} else {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
	}

	@PostMapping("/{id}")
	public ResponseEntity<Customer> placeOrder(@RequestBody Order order, @PathVariable("id") long customerId) {
		order.setCustomer(cusRepo.findById(customerId));
		order.setOrderDate(LocalDateTime.now());
		if (order.getAddress() == null) {
			order.setAddress(cusRepo.findById(customerId).getAddress());
		}

		List<Long> shillelaghIds = new ArrayList<Long>();
		Iterable<Long> ids = order.getContents().stream().map(s -> s.getShillelaghId()).collect(Collectors.toList());
		ids.forEach(shillelaghIds::add);
		List<Shillelagh> shillelaghs = new ArrayList<Shillelagh>();
		shiRepo.findbyId(shillelaghIds).forEach(shillelaghs::add);

		for (Shillelagh shillelagh : shillelaghs) {
			if (shillelagh.isOrdered()) {
				throw new ShillelaghUnavailableException(
						"This shillelagh is already ordered: id-" + shillelagh.getShillelaghId());
			} else {
				shillelagh.setOrder(order);
			}
		}

		order.setContents(shillelaghs);
		oRepo.save(order);
		if (oRepo.exists(order.getOrderId())) {
			// sets Shillelagh.ordered to true for each shillelagh in order
			shiRepo.orderShillelaghs(shillelaghIds);
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(customerId == -1 ? null : cusRepo.findById(customerId));
		} else {
			throw new RuntimeException(
					"Order not created: customerId-" + customerId + " orderId-" + order.getOrderId());
		}
	}

	@DeleteMapping("/{customerId}/{orderId}")
	public ResponseEntity<Customer> deleteOrder(@PathVariable long customerId, @PathVariable long orderId) {
		if (oRepo.exists(orderId)) {
			Order order = oRepo.findById(orderId);
			List<Long> ids = order.getContents().stream().map(s -> s.getShillelaghId()).collect(Collectors.toList());
			Iterable<Shillelagh> shillelaghs = shiRepo.findbyId(ids);
			shillelaghs.forEach(s -> s.setOrder(null));
			shillelaghs.forEach(s -> s.setOrdered(false));
			shillelaghs.forEach(s -> shiRepo.save(s));
			oRepo.deleteById(orderId);
			if (oRepo.exists(orderId)) {
				throw new OrderChangeFailedException(
						"Delete failed. If the problem persists please contact us: id-" + orderId);
			} else {
				return ResponseEntity.status(HttpStatus.ACCEPTED).body(cusRepo.findById(customerId));
			}
		} else {
			throw new NoSuchOrderException("Could not find order: id-" + orderId);
		}
	}

	@PutMapping("/{customerId}/{orderId}")
	public ResponseEntity<Customer> shipOrder(@PathVariable long customerId, @PathVariable long orderId) {
		if (oRepo.exists(orderId)) {
			Order order = oRepo.findById(orderId);
			List<Long> ids = order.getContents().stream().map(s -> s.getShillelaghId()).collect(Collectors.toList());
			Iterable<Shillelagh> shillelaghs = shiRepo.findbyId(ids);
			shillelaghs.forEach(s -> s.setShipped(true));
			shillelaghs.forEach(s -> shiRepo.save(s));
			oRepo.ship(orderId);
			return ResponseEntity.status(HttpStatus.FOUND).body(cusRepo.findById(customerId));
		} else {
			throw new NoSuchOrderException("Could not find order: id-" + orderId);
		}
	}

	// for testing
	public OrderController(OrderService oRepo, CustomerService cusRepo, ShillelaghService shiRepo) {
		this.oRepo = oRepo;
		this.cusRepo = cusRepo;
		this.shiRepo = shiRepo;
	}

}
