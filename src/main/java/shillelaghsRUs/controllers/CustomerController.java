package shillelaghsRUs.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import shillelaghsRUs.exceptions.NoSuchCustomerException;
import shillelaghsRUs.exceptions.UpdateFailedException;
import shillelaghsRUs.services.CustomerService;

import org.springframework.web.bind.annotation.RequestMethod;

@RestController
@RequestMapping("/customers")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = { RequestMethod.POST, RequestMethod.GET,
		RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS })
public class CustomerController {

	@Autowired
	private CustomerService cusRepo;

	@GetMapping
	public ResponseEntity<List<Customer>> getAll() {
		return ResponseEntity.status(HttpStatus.FOUND).body(cusRepo.findAll());
	}

	// admin
	@GetMapping("/{id}")
	public ResponseEntity<Customer> getCustomerById(@PathVariable long id) {
		if (cusRepo.exists(id)) {
			return ResponseEntity.status(HttpStatus.FOUND).body(cusRepo.findById(id));
		} else {
			throw new NoSuchCustomerException("Customer does not exist: id-" + id);
		}
	}

	@GetMapping("/name/{name}")
	public ResponseEntity<Customer> getIdByName(@PathVariable String name) {
		if (cusRepo.exists(name.toLowerCase())) {
			Customer customer = cusRepo.findByName(name);
			if (customer.isAdmin()) {
				return ResponseEntity.status(HttpStatus.ACCEPTED).body(customer);
			} else {
				return ResponseEntity.status(HttpStatus.FOUND).body(customer);
			}
		} else {
			Customer customer = new Customer();
			customer.setId(-2);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(customer);
		}

	}

	@GetMapping("/{id}/orders")
	public ResponseEntity<List<Order>> getCustomerOrders(@PathVariable long id) {
		if (cusRepo.exists(id)) {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(cusRepo.findById(id).getOrders());
		} else {
			throw new NoSuchCustomerException("Customer not found: id-" + id);
		}
	}

	@PostMapping
	public ResponseEntity<Customer> postCustomer(@RequestBody Customer customer) {
		boolean saved = cusRepo.save(customer);
		if (saved) {
			return ResponseEntity.status(HttpStatus.CREATED).body(cusRepo.findById(customer.getId()));
		} else {
			throw new RuntimeException("Customer not saved");
		}
	}

	@SuppressWarnings("rawtypes")
	@PostMapping("/post-customers")
	public ResponseEntity postCustomers(@RequestBody List<Customer> customers) {
		cusRepo.saveAll(customers);
		return ResponseEntity.accepted().build();
	}

	@PutMapping("/{id}")
	public ResponseEntity<Customer> editCustomer(@RequestBody Customer customerEdit, @PathVariable long id)
			throws NoSuchCustomerException, UpdateFailedException {
		boolean updated = cusRepo.update(customerEdit, id);
		if (updated) {
			return ResponseEntity.accepted().body(cusRepo.findById(id));
		} else {
			throw new RuntimeException("Customer update failed: id-" + id);
		}
	}

	@SuppressWarnings("rawtypes")
	@DeleteMapping("/{id}")
	public ResponseEntity deleteCustomer(@PathVariable long id) {
		if (cusRepo.exists(id)) {
			cusRepo.delete(id);
			return ResponseEntity.status(HttpStatus.ACCEPTED).build();
		} else {
			throw new NoSuchCustomerException("Customer does not exist: id-" + id);
		}

	}

	// for testing
	public CustomerController(CustomerService cusRepo) {
		this.cusRepo = cusRepo;
	}

}
