package shillelaghsrus.controllers;

import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import shillelaghsrus.entities.Credentials;
import shillelaghsrus.entities.Customer;
import shillelaghsrus.exceptions.CustomerExistsException;
import shillelaghsrus.exceptions.CustomerNotCreatedException;
import shillelaghsrus.exceptions.NoSuchCustomerException;
import shillelaghsrus.security.jwt.JwtTokenProvider;
import shillelaghsrus.services.CustomUserDetailsService;
import shillelaghsrus.services.CustomerService;

@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = { RequestMethod.POST, RequestMethod.GET,
		RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS })
public class SecurityController {

	@Autowired
	private CustomerService cusRepo;

	@Autowired
	private JwtTokenProvider provider;

	@Autowired
	private CustomUserDetailsService service;

	@Autowired
	private BCryptPasswordEncoder encoder;

	@Autowired
	AuthenticationManager manager;

	private final Decoder decoder = Base64.getDecoder();

	@PostMapping("/login")
	private ResponseEntity<Map<Object, Object>> login(@RequestBody Credentials login) {
		if (cusRepo.exists(login.getUsername())) {
			Customer customer = service.findCustomerByUsername(login.getUsername());

			if (encoder.matches(login.getPassword(), customer.getPassword())) {

				Map<Object, Object> model = new HashMap<>();

				model.put("customer", customer);

				if (customer.isAdmin()) {

					String token = provider.createToken(String.valueOf(customer.getId()),
							new SimpleGrantedAuthority("ADMIN"));
					model.put("token", "Bearer " + token);

					return ResponseEntity.status(HttpStatus.ACCEPTED).body(model);
				} else {

					String token = provider.createToken(String.valueOf(customer.getId()),
							new SimpleGrantedAuthority("USER"));
					model.put("token", "Bearer " + token);

					return ResponseEntity.status(HttpStatus.FOUND).body(model);
				}
			} else {
				return ResponseEntity.status(HttpStatus.CONFLICT).build();
			}

		} else {
			throw new NoSuchCustomerException(login.getUsername()
					+ " not found!  Please check your username or register if you don't have an account");
		}
	}

	@PostMapping("/register")
	private ResponseEntity<Map<Object, Object>> register(@RequestBody Credentials newCustomer) {
		if (!cusRepo.exists(newCustomer.getUsername())) {
			// username, firstName, lastName, address, password, email
			Customer customer = new Customer(newCustomer.getUsername(), newCustomer.getFirstName(),
					newCustomer.getLastName(), newCustomer.getAddress(), newCustomer.getPassword(),
					newCustomer.getEmail());
			customer.setAdmin(false);

			service.saveCustomer(customer);

			if (cusRepo.exists(customer.getUsername())) {
				Map<Object, Object> model = new HashMap<>();

				model.put("customer", customer);
				String token = provider.createToken(String.valueOf(customer.getId()),
						new SimpleGrantedAuthority("USER"));
				model.put("token", "Bearer " + token);
				return ResponseEntity.status(HttpStatus.CREATED).body(model);

			} else {
				throw new CustomerNotCreatedException(
						"Could not create account.  Please contact us if the issue persists");
			}

		} else {
			throw new CustomerExistsException(newCustomer.getUsername()
					+ " already exists.  Follow the links provided if you forgot your password");
		}
	}

}
