package shillelaghsRUs.exceptions;

public class OrderChangeFailedException extends RuntimeException {

	private static final long serialVersionUID = 4L;

	public OrderChangeFailedException(String message) {
		super(message);
	}

}
