package shillelaghsrus.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NoSuchShillelaghException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public NoSuchShillelaghException(String string) {
		super(string);
	}

}
