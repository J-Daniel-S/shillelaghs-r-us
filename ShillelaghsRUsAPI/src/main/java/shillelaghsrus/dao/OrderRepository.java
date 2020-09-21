package shillelaghsrus.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import shillelaghsrus.entities.Order;

public interface OrderRepository extends CrudRepository<Order, Long> {

	public List<Order> findAll();

}
