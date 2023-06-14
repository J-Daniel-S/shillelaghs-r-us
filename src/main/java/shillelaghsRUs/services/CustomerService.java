package shillelaghsRUs.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import shillelaghsRUs.dao.CustomerRepository;
import shillelaghsRUs.entities.Customer;
import shillelaghsRUs.exceptions.NoSuchCustomerException;
import shillelaghsRUs.exceptions.UpdateFailedException;

@Service
public class CustomerService {

	@Autowired
	private CustomerRepository cusRepo;

	public List<Customer> findAll() {
		return cusRepo.findAll();
	}

	public Customer findById(long id) {
		if (cusRepo.existsById(id)) {
			return cusRepo.findById(id).get();
		} else {
			throw new NoSuchCustomerException("Customer does not exist: id-" + id);
		}
	}

	public Customer findByName(String name) {
		return cusRepo.findByName(name.toLowerCase());
	}

	public Iterable<Customer> findAllById(List<Long> ids) {
		return cusRepo.findAllById(ids);
	}

	public boolean exists(long id) {
		return cusRepo.existsById(id);
	}

	public boolean exists(String username) {
		if (cusRepo.findByName(username) != null) {
			return true;
		} else {
			return false;
		}
	}

	public boolean save(Customer customer) {
		customer.setFirstName(customer.getFirstName().toLowerCase());
		customer.setLastName(customer.getLastName().toLowerCase());
		customer.setUsername(customer.getUsername().toLowerCase());
		cusRepo.save(customer);
		if (cusRepo.existsById(customer.getId())) {
			return true;
		} else {
			return false;
		}
	}

	public void saveAll(List<Customer> customers) {
		cusRepo.saveAll(customers);
	}

	public boolean delete(long id) {
		if (cusRepo.existsById(id)) {
			cusRepo.deleteById(id);
			return true;
		} else {
			throw new NoSuchCustomerException("Customer does not exist: id-" + id);
		}
	}

	public boolean update(Customer customer, long id) throws UpdateFailedException, NoSuchCustomerException {
		if (cusRepo.existsById(id)) {
			cusRepo.save(customer);
			if (cusRepo.existsById(id)) {
				return true;
			} else {
				throw new UpdateFailedException("Customer update failed: id-" + id);
			}
		} else {
			throw new NoSuchCustomerException("Customer does not exist: id-" + id);
		}
	}

	// testing
	public CustomerService(CustomerRepository cusRepo) {
		this.cusRepo = cusRepo;
	}

}
