package shillelaghsRUs.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import shillelaghsRUs.dao.CustomerRepository;
import shillelaghsRUs.entities.Customer;
import shillelaghsRUs.exceptions.NoSuchCustomerException;
import shillelaghsRUs.exceptions.UpdateFailedException;

public class CustomerServiceTest {

	@Mock
	private CustomerRepository cusRepo;
	private CustomerService cusServ;
	List<Customer> customers;
	Customer customer;

	@BeforeEach
	public void setup() {
		MockitoAnnotations.initMocks(this);
		cusServ = new CustomerService(cusRepo);
		customers = new ArrayList<>();
		customer = new Customer();
		customers.add(customer);

	}

	@Test
	public void testFindAll() {
		// given
		when(cusRepo.findAll()).thenReturn(customers);

		// when
		List<Customer> res = cusServ.findAll();

		// then
		assertThat(res).isEqualTo(customers);
	}

	@Test
	public void testFindById() {
		// given
		when(cusRepo.existsById(anyLong())).thenReturn(true);
		when(cusRepo.findById(anyLong())).thenReturn(Optional.of(customer));

		// when
		Customer res = cusServ.findById(1);

		// then
		assertThat(res).isEqualTo(customer);
	}

	@Test
	public void testFindByName() {
		// given

		// when

		// then
		fail("findByName not implemented");
	}

	@Test
	public void testFindAllById() {
		// given
		when(cusRepo.findAllById(anyList())).thenReturn(customers);

		// when
		Iterable<Customer> res = cusServ.findAllById(new ArrayList<Long>());

		// then
		assertThat(res).isEqualTo(customers);
	}

	@Test
	public void testExists() {
		// given
		when(cusRepo.existsById(anyLong())).thenReturn(true);

		// when
		boolean res = cusServ.exists(1);

		// then
		assertThat(res).isTrue();
	}

	@Test
	public void testSave() {
		// given
		when(cusRepo.existsById(anyLong())).thenReturn(true);

		// when
		boolean res = cusServ.save(new Customer());

		// then
		assertThat(res).isTrue();
	}

	@Test
	public void testDelete() {
		// given
		when(cusRepo.existsById(anyLong())).thenReturn(true);

		// when
		boolean res = cusServ.delete(1);

		// then
		assertThat(res).isEqualTo(true);
	}

	@Test
	public void testUpdate() throws UpdateFailedException, NoSuchCustomerException {
		// given
		when(cusRepo.existsById(anyLong())).thenReturn(true).thenReturn(true);

		// when
		boolean res = cusServ.update(customer, 1);

		// then
		assertThat(res).isTrue();
	}

}
