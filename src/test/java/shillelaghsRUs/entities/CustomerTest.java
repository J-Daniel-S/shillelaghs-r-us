package shillelaghsRUs.entities;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class CustomerTest {

	Customer timmy;
	List<Order> orders;

	@BeforeEach
	public void setup() {
		timmy = new Customer("timmy", "timmerson", "1 timmehsplace dr timmerson, tm 13375", false);
		orders = new ArrayList<>();
		timmy.setOrders(orders);
		timmy.setId(1);
	}

	@Test
	public void testCustomerStringStringString() {
		assertThat(timmy.getOrders()).isInstanceOf(ArrayList.class);
		assertThat(timmy.getLastName()).isEqualTo("timmerson");
	}

	@Test
	public void testCustomer() {
		Customer notTimmy = new Customer();
		assertThat(notTimmy).isNotNull();
	}

	@Test
	public void testSetId() {
		timmy.setId(1);
		assertThat(timmy.getId()).isEqualTo(1);
	}

	@Test
	public void testGetFirstName() {
		assertThat(timmy.getFirstName()).isEqualTo("timmy");
	}

	@Test
	public void testSetFirstName() {
		timmy.setFirstName("still timmy");
		assertThat(timmy.getFirstName()).isEqualTo("still timmy");
	}

	@Test
	public void testGetLastName() {
		assertThat(timmy.getLastName()).isEqualTo("timmerson");
	}

	@Test
	public void testSetLastName() {
		timmy.setLastName("still timmerson");
		assertThat(timmy.getLastName()).isEqualTo("still timmerson");
	}

	@Test
	public void testGetAddress() {
		assertThat(timmy.getAddress()).isEqualTo("1 timmehsplace dr timmerson, tm 13375");
	}

	@Test
	public void testSetAddress() {
		timmy.setAddress("not 1 timmehsplace dr timmerson, tm 13375");
		assertThat(timmy.getAddress()).isEqualTo("not 1 timmehsplace dr timmerson, tm 13375");
	}

	@Test
	public void testGetOrders() {
		assertThat(timmy.getOrders()).isEqualTo(orders);
	}

	@Test
	public void testSetOrders() {
		List<Order> newOrders = new ArrayList<>();
		timmy.setOrders(newOrders);
		assertThat(timmy.getOrders()).isEqualTo(newOrders);
	}

	@Test
	public void testGetId() {
		assertThat(timmy.getId()).isEqualTo(1);
	}

	@Test
	public void testToString() {
		timmy.setId(2);
		assertThat(timmy.getId()).isEqualTo(2);
	}

}
