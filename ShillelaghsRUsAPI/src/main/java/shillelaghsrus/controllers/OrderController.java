package shillelaghsrus.controllers;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import shillelaghsrus.entities.Order;
import shillelaghsrus.entities.Shillelagh;
import shillelaghsrus.exceptions.NoSuchOrderException;
import shillelaghsrus.exceptions.OrderChangeFailedException;
import shillelaghsrus.exceptions.ShillelaghUnavailableException;
import shillelaghsrus.services.CustomerService;
import shillelaghsrus.services.OrderService;
import shillelaghsrus.services.ShillelaghService;

@RestController
@RequestMapping("/orders")
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

	@PostMapping("/{id}")
	public ResponseEntity<Order> placeOrder(@RequestBody Order order, @PathVariable("id") long customerId) {
		order.setOrderDate(LocalDateTime.now());
		order.setCustomer(cusRepo.findById(customerId));
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
			return ResponseEntity.status(HttpStatus.CREATED).body(order);
		} else {
			throw new RuntimeException(
					"Order not created: customerId-" + customerId + " orderId-" + order.getOrderId());
		}
	}

	@SuppressWarnings("rawtypes")
	@DeleteMapping("/{id}")
	public ResponseEntity deleteOrder(@PathVariable long orderId) {
		if (oRepo.exists(orderId)) {
			oRepo.deleteById(orderId);
			if (oRepo.exists(orderId)) {
				throw new OrderChangeFailedException(
						"Delete failed. If the problem persists please contact us: id-" + orderId);
			} else {
				return ResponseEntity.status(HttpStatus.ACCEPTED).build();
			}
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
