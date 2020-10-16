package shillelaghsrus.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.I_AM_A_TEAPOT)
public class CustomerNotCreatedException extends RuntimeException {

	private static final long serialVersionUID = 9L;

	public CustomerNotCreatedException(String message) {
		super(message);
	}

}
