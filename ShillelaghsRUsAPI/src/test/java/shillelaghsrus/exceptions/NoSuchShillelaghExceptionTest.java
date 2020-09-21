package shillelaghsrus.exceptions;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;

public class NoSuchShillelaghExceptionTest {

	@Test
	public void testNoSuchShillelaghException() {
		NoSuchShillelaghException exception = new NoSuchShillelaghException("test");
		assertThat(exception.getMessage()).isEqualTo("test");
	}

}
