package shillelaghsRUs.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import shillelaghsRUs.entities.Customer;
import shillelaghsRUs.entities.Method;
import shillelaghsRUs.exceptions.NoSuchCustomerException;
import shillelaghsRUs.exceptions.NoSuchPaymentMethodException;
import shillelaghsRUs.services.CustomerService;
import shillelaghsRUs.services.MethodService;

import org.springframework.web.bind.annotation.RequestMethod;


@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = { RequestMethod.POST, RequestMethod.GET,
		RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS })
public class MethodController {

	@Autowired
	private MethodService methRepo;

	@Autowired
	private CustomerService cusRepo;

	@GetMapping("/{id}")
	public ResponseEntity<List<Method>> getMethods(@PathVariable long id) {
		if (cusRepo.exists(id)) {
			return ResponseEntity.ok().body(methRepo.findByCustomer(id));
		} else {
			throw new NoSuchCustomerException("Customer not found: id-" + id);
		}
	}

	@PostMapping("/{id}")
	public ResponseEntity<Customer> addMethod(@RequestBody Method method, @PathVariable("id") long customerId) {
		if (cusRepo.exists(customerId)) {
			method.setCustomer(cusRepo.findById(customerId));
			methRepo.save(method);
			return ResponseEntity.accepted().body(cusRepo.findById(customerId));
		} else {
			throw new NoSuchCustomerException("Customer does not exist: id-" + customerId);
		}
	}

	@DeleteMapping("/{cusId}/{methId}")
	public ResponseEntity<Customer> deleteMethod(@PathVariable long cusId, @PathVariable long methId) {
		if (methRepo.exists(methId)) {
			methRepo.deleteById(methId);
			return ResponseEntity.accepted().body(cusRepo.findById(cusId));
		} else {
			throw new NoSuchPaymentMethodException("Payment method does not exist: id-");
		}
	}

}
