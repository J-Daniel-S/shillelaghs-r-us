package shillelaghsRUs.controllers;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import shillelaghsRUs.entities.Customer;
import shillelaghsRUs.entities.Order;
import shillelaghsRUs.entities.Shillelagh;
import shillelaghsRUs.services.CustomerService;
import shillelaghsRUs.services.OrderService;
import shillelaghsRUs.services.ShillelaghService;

public class OrderControllerTest {

	@Mock
	private OrderService oRepo;
	@Mock
	private CustomerService cusRepo;
	@Mock
	private ShillelaghService shiRepo;
	private OrderController controller;
	private Order order;
	private Customer timmy;
	private Shillelagh shillelagh;
	private List<Shillelagh> contents;
	List<Order> orders;

	@SuppressWarnings("deprecation")
	@BeforeEach
	public void setup() {
		MockitoAnnotations.initMocks(this);
		controller = new OrderController(oRepo, cusRepo, shiRepo);
		shillelagh = new Shillelagh("timmy's new club");
		contents = new ArrayList<Shillelagh>();
		contents.add(shillelagh);
		timmy = new Customer("timmy", "timmerson", "3664 timmehsplace dr timmerson, ti 41388", false);
		order = new Order(LocalDateTime.now(), "here", timmy, contents);
		order.setOrderId(1);
		orders = new ArrayList<Order>();
		orders.add(order);
	}

	@Test
	public void testGetOrderById() {
		// given
		when(oRepo.exists(anyLong())).thenReturn(true);
		when(oRepo.findById(anyLong())).thenReturn(order);

		// when
		ResponseEntity<Order> response = controller.getOrderById(1);
		Order theOrder = response.getBody();

		// then
		assertThat(theOrder.getCustomer()).isEqualTo(timmy);
	}

	@Test
	public void testGetAllOrders() {
		// given
		when(oRepo.findAll()).thenReturn(orders);

		// when
		ResponseEntity<List<Order>> response = controller.getAllOrders();
		List<Order> allOrders = response.getBody();

		// then
		assertThat(allOrders.get(0)).isEqualTo(order);

	}

	@Test
	public void testPlaceOrder() {
		// given
		List<Shillelagh> theContents = new ArrayList<>();
		Shillelagh newShillelagh = new Shillelagh("timmy's other new club");
		newShillelagh.setShillelaghId(555);
		theContents.add(newShillelagh);
		Order secondOrder = new Order(timmy);
		when(oRepo.exists(anyLong())).thenReturn(true);
		when(cusRepo.findById(anyLong())).thenReturn(timmy);
		when(shiRepo.findbyId(anyList())).thenReturn(theContents);

		// when
		ResponseEntity<Customer> response = controller.placeOrder(secondOrder, timmy.getId());
		Customer theCustomer = response.getBody();

		// then
		assertThat(theCustomer.getId()).isEqualTo(timmy.getId());
	}

	@SuppressWarnings("rawtypes")
	@Test
	public void testDeleteOrder() {
		// given
		when(oRepo.exists(anyLong())).thenReturn(true).thenReturn(false);

		// when
		ResponseEntity response = controller.deleteOrder(timmy.getId(), order.getOrderId());

		// then
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.ACCEPTED);
	}

}
