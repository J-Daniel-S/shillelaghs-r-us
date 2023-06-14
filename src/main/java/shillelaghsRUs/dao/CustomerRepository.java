package shillelaghsRUs.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import shillelaghsRUs.entities.Customer;

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Long> {

	@Override
	public List<Customer> findAll();

	@Query(nativeQuery = true, value = "SELECT customer_id FROM customers WHERE username = ?1")
	public Long findIdByName(String name);

	@Query(nativeQuery = true, value = "SELECT * FROM customers WHERE username = ?1")
	public Customer findByName(String name);

}
