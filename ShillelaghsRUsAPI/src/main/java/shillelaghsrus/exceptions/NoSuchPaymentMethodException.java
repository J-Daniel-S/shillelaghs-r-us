package shillelaghsrus.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NoSuchPaymentMethodException extends RuntimeException {
	private static final long serialVersionUID = 6L;

	public NoSuchPaymentMethodException(String message) {
		super(message);
	}
}
