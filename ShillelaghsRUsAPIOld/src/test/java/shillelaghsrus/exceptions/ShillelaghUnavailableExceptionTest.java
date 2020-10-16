package shillelaghsrus.exceptions;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;

public class ShillelaghUnavailableExceptionTest {

	@Test
	public void testShillelaghUnavailableException() {
		ShillelaghUnavailableException exception = new ShillelaghUnavailableException("test");
		assertThat(exception.getMessage()).isEqualTo("test");
	}

}
