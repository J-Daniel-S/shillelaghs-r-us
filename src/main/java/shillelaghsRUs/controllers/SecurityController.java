package shillelaghsRUs.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import shillelaghsRUs.entities.Customer;
import shillelaghsRUs.security.utils.AuthenticationResponse;
import shillelaghsRUs.services.AuthenticationService;
import shillelaghsRUs.services.CustomerService;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = { RequestMethod.POST, RequestMethod.GET,
		RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS })
public class SecurityController {
	
	@Autowired
	private CustomerService cusRepo;
	@Autowired
	private AuthenticationService authServ;
	
	//TODO possibly change front end to send request in url
	@PostMapping("/{name}")
	public ResponseEntity<AuthenticationResponse> login(@RequestBody Customer customer) {
		AuthenticationResponse response = authServ.authenticate(customer);
		if (response.getToken().equals("")) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		} else {
			return ResponseEntity.status(HttpStatus.FOUND).body(response);
		}
	}
	
	@PostMapping //register
	public ResponseEntity<AuthenticationResponse> createCustomer(@RequestBody Customer customer) {
		AuthenticationResponse response = authServ.register(customer);
		if (cusRepo.exists(customer.getUsername())) {
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} else {
			return ResponseEntity.status(HttpStatus.valueOf(500)).build();
		}
	}

}
