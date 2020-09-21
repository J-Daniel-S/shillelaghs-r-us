package shillelaghsrus.exceptions;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;

public class OrderChangeFailedExceptionTest {

	@Test
	public void testOrderChangeFailedException() {
		OrderChangeFailedException exception = new OrderChangeFailedException("test");
		assertThat(exception.getMessage()).isEqualTo("test");
	}

}
