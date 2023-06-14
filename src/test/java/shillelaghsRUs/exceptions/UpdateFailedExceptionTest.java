package shillelaghsRUs.exceptions;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

public class UpdateFailedExceptionTest {

	@Test
	public void testUpdateFailedException() {
		UpdateFailedException exception = new UpdateFailedException("test");
		assertThat(exception.getMessage()).isEqualTo("test");
	}

}
