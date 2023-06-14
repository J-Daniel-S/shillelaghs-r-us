package shillelaghsRUs.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class ShillelaghUnavailableException extends RuntimeException {

	private static final long serialVersionUID = 4L;

	public ShillelaghUnavailableException(String message) {
		super(message);
	}

}