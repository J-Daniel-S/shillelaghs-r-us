package shillelaghsRUs.controllers;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import shillelaghsRUs.entities.Customer;
import shillelaghsRUs.services.CustomerService;
import shillelaghsRUs.entities.Order;
import shillelaghsRUs.exceptions.NoSuchCustomerException;
import shillelaghsRUs.exceptions.UpdateFailedException;

public class CustomerControllerTest {

	@Mock
	private CustomerService cusRepo;
	private CustomerController controller;
	private Customer timmy;
	private Customer stevie;
	private List<Customer> customers;

	@SuppressWarnings("deprecation")
	@BeforeEach
	public void setup() {
		MockitoAnnotations.initMocks(this);
		controller = new CustomerController(cusRepo);
		timmy = new Customer("timmy", "timmerson", "3664 timmehsplace dr timmerson, ti 41388", false);
		stevie = new Customer("stevie", "steverson", "78 steviesplace dr steverson, st 21766", false);
		timmy.setId(1);
		stevie.setId(2);
		customers = new ArrayList<Customer>();
		customers.add(timmy);
		customers.add(stevie);
	}

	@Test
	public void testGetAll() {
		// given
		when(cusRepo.findAll()).thenReturn(customers);

		// when
		ResponseEntity<List<Customer>> response = controller.getAll();
		List<Customer> customers = response.getBody();

		// then
		assertEquals(2, customers.size());
	}

	@Test
	public void testGetCustomerById() {
		// given
		when(cusRepo.exists(anyLong())).thenReturn(true);
		when(cusRepo.findById(anyLong())).thenReturn(stevie);

		// when
		ResponseEntity<Customer> response = controller.getCustomerById(2);
		Customer customer = response.getBody();

		// then
		assertEquals(2, customer.getId());
	}

	@Test
	public void testGetCustomerOrders() {
		// given
		when(cusRepo.exists(anyLong())).thenReturn(true);
		when(cusRepo.findById(anyLong())).thenReturn(stevie);
		Order order = new Order();
		order.setOrderId(1);
		List<Order> steviesOrders = new ArrayList<Order>();
		steviesOrders.add(order);
		stevie.setOrders(steviesOrders);

		// when
		ResponseEntity<List<Order>> response = controller.getCustomerOrders(2);
		List<Order> theOrders = response.getBody();

		// then
		assertThat(theOrders.get(0)).isInstanceOf(Order.class);
	}

	@Test
	public void testPostCustomer() {
		// given
		Customer mikey = new Customer("mikey", "mikerson", "2 mikely st mikesville, me 23799", false);
		when(cusRepo.save(any(Customer.class))).thenReturn(true);
		when(cusRepo.findById(anyLong())).thenReturn(mikey);

		// when
		ResponseEntity<Customer> response = controller.postCustomer(mikey);
		Customer res = response.getBody();

		// then
		assertThat(res).isEqualTo(mikey);
	}

	@Test
	public void testPostCustomers() {
		// when
		@SuppressWarnings("rawtypes")
		ResponseEntity response = controller.postCustomers(new ArrayList<Customer>());

		// then
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.ACCEPTED);
	}

	@Test
	public void testCustomerEdit() throws NoSuchCustomerException, UpdateFailedException {
		// given
		timmy.setFirstName("big timmy");
		when(cusRepo.update(any(Customer.class), anyLong())).thenReturn(true);
		when(cusRepo.findById(anyLong())).thenReturn(timmy);

		// then
		ResponseEntity<Customer> response = controller.editCustomer(timmy, 1);
		Customer cus = response.getBody();

		// when
		assertThat(cus.getFirstName()).isEqualTo("big timmy");
	}

	@Test
	public void testDeleteCustomer() {
		// when
		@SuppressWarnings("rawtypes")
		ResponseEntity response = controller.deleteCustomer(1);

		// then
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.ACCEPTED);
	}

}
