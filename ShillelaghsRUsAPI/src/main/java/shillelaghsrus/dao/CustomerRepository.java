package shillelaghsrus.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import shillelaghsrus.entities.Customer;

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Long> {

	@Override
	public List<Customer> findAll();

}
