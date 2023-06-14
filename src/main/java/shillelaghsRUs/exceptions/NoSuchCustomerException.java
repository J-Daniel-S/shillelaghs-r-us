package shillelaghsRUs.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NoSuchCustomerException extends RuntimeException {

	private static final long serialVersionUID = 3L;

	public NoSuchCustomerException(String message) {
		super(message);
	}

}
