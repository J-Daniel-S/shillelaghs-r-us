package shillelaghsRUs.exceptions;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

public class NoSuchOrderExceptionTest {

	@Test
	public void testNoSuchOrderException() {
		NoSuchOrderException exception = new NoSuchOrderException("test");
		assertThat(exception.getMessage()).isEqualTo("test");
	}

}
