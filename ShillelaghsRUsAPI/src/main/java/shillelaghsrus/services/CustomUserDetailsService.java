package shillelaghsrus.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import shillelaghsrus.entities.Customer;
import shillelaghsrus.exceptions.NoSuchCustomerException;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private CustomerService cusRepo;

	@Autowired
	private PasswordEncoder encoder;

	public Customer findCustomerByUsername(String username) {
		return cusRepo.findByName(username);
	}

	public void saveCustomer(Customer customer) {
		customer.setUsername(customer.getUsername());
		customer.setPassword(encoder.encode(customer.getPassword()));
		cusRepo.save(customer);
	}

	public UserDetails loadUserById(String id) throws NoSuchCustomerException {
		Long cusId = Long.valueOf(id);
		Customer customer = cusRepo.findById(cusId);

		List<GrantedAuthority> authorities = new ArrayList<>();
		if (customer.isAdmin()) {
			authorities.add(new SimpleGrantedAuthority("ADMIN"));
		} else {
			authorities.add(new SimpleGrantedAuthority("USER"));
		}

		return buildUserForAuthentication(customer, authorities);
	}

	private UserDetails buildUserForAuthentication(Customer customer, List<GrantedAuthority> authorities) {
		// id is represented in response as "username"
		return new User(String.valueOf(customer.getId()), customer.getPassword(), authorities);
	}

	@Override
	public UserDetails loadUserByUsername(String username) {
		Customer customer = cusRepo.findByName(username);

		List<GrantedAuthority> authorities = new ArrayList<>();
		if (customer.isAdmin()) {
			authorities.add(new SimpleGrantedAuthority("ADMIN"));
		} else {
			authorities.add(new SimpleGrantedAuthority("USER"));
		}

		return buildUserForAuthentication(customer, authorities);
	}

}