package shillelaghsRUs.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import shillelaghsRUs.dao.OrderRepository;
import shillelaghsRUs.entities.Order;

public class OrderServiceTest {

	@Mock
	OrderRepository oRepo;
	OrderService oServ;
	List<Order> orders;
	Order order;

	@BeforeEach
	public void setup() {
		MockitoAnnotations.initMocks(this);
		oServ = new OrderService(oRepo);
		order = new Order();
		orders = new ArrayList<>();
		orders.add(order);

	}

	@Test
	public void testFindAll() {
		// given
		when(oRepo.findAll()).thenReturn(orders);

		// when
		List<Order> theOrders = oServ.findAll();

		// then
		assertThat(theOrders).isEqualTo(orders);
	}

	@Test
	public void testFindById() {
		// given
		when(oRepo.existsById(anyLong())).thenReturn(true);
		when(oRepo.findById(anyLong())).thenReturn(Optional.of(order));

		// when
		Order theOrder = oServ.findById(1);

		// then
		assertThat(theOrder).isEqualTo(order);
	}

	@Test
	public void testExists() {
		// given
		when(oRepo.existsById(anyLong())).thenReturn(true);

		// when
		boolean res = oServ.exists(1);

		// then
		assertThat(res).isTrue();
	}

}
