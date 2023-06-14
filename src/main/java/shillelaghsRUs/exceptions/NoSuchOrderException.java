package shillelaghsRUs.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NoSuchOrderException extends RuntimeException {

	private static final long serialVersionUID = 2L;

	public NoSuchOrderException(String message) {
		super(message);
	}

}