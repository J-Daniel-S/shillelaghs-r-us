package shillelaghsRUs.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import shillelaghsRUs.entities.Customer;
import shillelaghsRUs.security.config.JwtService;
import shillelaghsRUs.security.utils.AuthenticationResponse;

@Component
public class AuthenticationService {

	@Autowired
	private CustomerService cusRepo;
	@Autowired
	private BCryptPasswordEncoder pCoder;
	@Autowired
	private JwtService jServ;
	@Autowired
	private AuthenticationManager authManager;

	public AuthenticationResponse authenticate(Customer customer) {
		authManager
				.authenticate(
						new UsernamePasswordAuthenticationToken(customer.getUsername(), customer.getPassword())
						);
		String username = customer.getUsername();
		if (cusRepo.exists(username)) {
			String jwtToken = jServ.generateToken(customer);
			return new AuthenticationResponse(jwtToken);
		} else {
			return new AuthenticationResponse("");
		}

	}

	public AuthenticationResponse register(Customer customer) {
		customer.setPassword(pCoder.encode(customer.getPassword()));
		// TODO add role. Keep boolean check for simplicity
		cusRepo.save(customer);
		String jwtToken = jServ.generateToken(customer);
		return new AuthenticationResponse(jwtToken);
	}

}
