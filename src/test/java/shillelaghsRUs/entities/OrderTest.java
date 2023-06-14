package shillelaghsRUs.entities;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class OrderTest {

	Customer timmy;
	Order order;
	List<Shillelagh> contents;
	LocalDateTime testTime;

	@BeforeEach
	public void setup() {
		testTime = LocalDateTime.now();
		contents = new ArrayList<>();
		timmy = new Customer();
		order = new Order(testTime, "test address", timmy, contents);
		order.setOrderId(5);
	}

	@Test
	public void testOrderLocalDateTimeStringCustomerListOfShillelagh() {
		assertThat(order).isNotNull();
	}

	@Test
	public void testOrderCustomer() {
		Order newOrder = new Order(timmy);
		assertThat(newOrder.getCustomer()).isEqualTo(timmy);
	}

	@Test
	public void testOrder() {
		Order alsoNewOrder = new Order();
		assertThat(alsoNewOrder).isNotNull();
	}

	@Test
	public void testGetContents() {
		assertThat(order.getContents()).isEqualTo(contents);
	}

	@Test
	public void testSetContents() {
		List<Shillelagh> newContents = new ArrayList<>();
		order.setContents(newContents);
		assertThat(order.getContents()).isEqualTo(newContents);
	}

	@Test
	public void testGetCustomer() {
		assertThat(order.getCustomer()).isEqualTo(timmy);
	}

	@Test
	public void testSetCustomer() {
		Customer notTimmy = new Customer();
		order.setCustomer(notTimmy);
		assertThat(order.getCustomer()).isEqualTo(notTimmy);
	}

	@Test
	public void testSetOrderId() {
		order.setOrderId(1);
		assertThat(order.getOrderId()).isEqualTo(1);
	}

	@Test
	public void testGetOrderDate() {
		assertThat(order.getOrderDate()).isEqualTo(testTime);
	}

	@Test
	public void testSetOrderDate() {
		LocalDateTime newDate = LocalDateTime.now();
		order.setOrderDate(newDate);
		assertThat(order.getOrderDate()).isEqualTo(newDate);
	}

	@Test
	public void testGetAddress() {
		assertThat(order.getAddress()).isEqualTo("test address");
	}

	@Test
	public void testSetAddress() {
		String newAddress = "new address";
		order.setAddress(newAddress);
		assertThat(order.getAddress()).isEqualTo(newAddress);
	}

	@Test
	public void testGetOrderId() {
		assertThat(order.getOrderId()).isEqualTo(5);
	}

}
