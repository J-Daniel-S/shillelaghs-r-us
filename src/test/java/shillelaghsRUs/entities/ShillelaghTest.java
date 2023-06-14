package shillelaghsRUs.entities;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class ShillelaghTest {

	Shillelagh shillelagh;
	Order order;

	@BeforeEach
	public void setup() {
		order = new Order();
		shillelagh = new Shillelagh("stick");
		shillelagh.setShillelaghId(1);
		shillelagh.setOrder(order);
	}

	@Test
	public void testShillelaghString() {
		assertThat(shillelagh).isNotNull();
	}

	@Test
	public void testShillelagh() {
		Shillelagh newShillelagh = new Shillelagh();
		assertThat(newShillelagh).isNotNull();
	}

	@Test
	public void testGetShillelaghId() {
		assertThat(shillelagh.getShillelaghId()).isEqualTo(1);
	}

	@Test
	public void testGetName() {
		assertThat(shillelagh.getName()).isEqualTo("stick");
	}

	@Test
	public void testSetName() {
		String newName = "also stick";
		shillelagh.setName(newName);
		assertThat(shillelagh.getName()).isEqualTo(newName);
	}

	@Test
	public void testIsOrdered() {
		assertThat(shillelagh.isOrdered()).isFalse();
	}

	@Test
	public void testSetOrdered() {
		shillelagh.setOrdered(true);
		assertThat(shillelagh.isOrdered()).isTrue();
	}

	@Test
	public void testIsShipped() {
		assertThat(shillelagh.isShipped()).isFalse();
	}

	@Test
	public void testSetShipped() {
		shillelagh.setShipped(true);
		assertThat(shillelagh.isShipped()).isTrue();
	}

	@Test
	public void testGetOrder() {
		assertThat(shillelagh.getOrder()).isEqualTo(order);
	}

	@Test
	public void testSetOrder() {
		Order newOrder = new Order();
		shillelagh.setOrder(newOrder);
		assertThat(shillelagh.getOrder()).isEqualTo(newOrder);
	}

	@Test
	public void testSetId() {
		shillelagh.setShillelaghId(2);
		assertThat(shillelagh.getShillelaghId()).isEqualTo(2);
	}

}
