package shillelaghsrus.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import shillelaghsrus.entities.Order;

public interface OrderRepository extends CrudRepository<Order, Long> {

	@Query(nativeQuery = true, value = "SELECT * FROM orders WHERE customer_id = ?1")
	public List<Order> findByCustomerId(long id);

	public List<Order> findAll();

}
