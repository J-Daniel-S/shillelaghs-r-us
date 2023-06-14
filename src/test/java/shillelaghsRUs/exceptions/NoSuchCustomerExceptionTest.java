package shillelaghsRUs.exceptions;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

public class NoSuchCustomerExceptionTest {

	@Test
	public void testNoSuchCustomerException() {
		NoSuchCustomerException exception = new NoSuchCustomerException("test");
		assertThat(exception.getMessage()).isEqualTo("test");
	}

}
