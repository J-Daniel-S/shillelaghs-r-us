package shillelaghsRUs.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import shillelaghsRUs.dao.OrderRepository;
import shillelaghsRUs.entities.Order;
import shillelaghsRUs.exceptions.NoSuchOrderException;

@Service
public class OrderService {

	@Autowired
	private OrderRepository oRepo;

	public List<Order> findAll() {
		return oRepo.findAll();
	}

	public Order findById(long id) {
		if (oRepo.existsById(id)) {
			return oRepo.findById(id).get();
		} else {
			throw new NoSuchOrderException("Order does not exist: id-" + id);
		}
	}

	public boolean exists(long id) {
		return oRepo.existsById(id);
	}

	public void deleteById(long id) {
		oRepo.deleteById(id);
	}

	public void save(Order order) {
		oRepo.save(order);
	}

	public void save(List<Order> orders) {
		oRepo.saveAll(orders);
	}

	public void ship(long orderId) {
		Order order = oRepo.findById(orderId).get();
		order.setShipped(true);
		oRepo.save(order);
	}

	// test
	public OrderService(OrderRepository oRepo) {
		this.oRepo = oRepo;
	}

	public List<Order> findByCustomer(long customerId) {
		return oRepo.findByCustomerId(customerId);
	}

}
