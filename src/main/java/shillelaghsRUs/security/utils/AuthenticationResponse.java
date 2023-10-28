package shillelaghsRUs.security.utils;

public class AuthenticationResponse {
	
	private String token;
	
	public AuthenticationResponse() {
		
	}
	
	public AuthenticationResponse(String token) {
		this.token = token;
	}

	public synchronized String getToken() {
		return token;
	}

	public synchronized void setToken(String token) {
		this.token = token;
	}

	@Override
	public String toString() {
		return "AuthenticationResponse [token=" + token + "]";
	}
	

}
