package shillelaghsrus.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NoSuchOrderException extends RuntimeException {

	private static final long serialVersionUID = 2L;

	public NoSuchOrderException(String message) {
		super(message);
	}

}
