package com.trung.demo.model;

public class AuthResponse {
	private String jwtToken;
	private String emailErrMsg;
	private String passwordErrMsg;
	private boolean valid;
	private User current_user;
	
	public AuthResponse() { }
	
	public AuthResponse(String jwtToken, String emailErrMsg, String passwordErrMsg, boolean valid, User current_user) {
		super();
		this.jwtToken = jwtToken;
		this.emailErrMsg = emailErrMsg;
		this.passwordErrMsg = passwordErrMsg;
		this.valid = valid;
		this.current_user = current_user;
	}

	public String getJwtToken() {
		return jwtToken;
	}

	public void setJwtToken(String jwtToken) {
		this.jwtToken = jwtToken;
	}
	
	public String getEmailErrMsg() {
		return emailErrMsg;
	}

	public void setEmailErrMsg(String emailErrMsg) {
		this.emailErrMsg = emailErrMsg;
	}

	public String getPasswordErrMsg() {
		return passwordErrMsg;
	}

	public void setPasswordErrMsg(String passwordErrMsg) {
		this.passwordErrMsg = passwordErrMsg;
	}

	public boolean isValid() {
		return valid;
	}

	public void setValid(boolean valid) {
		this.valid = valid;
	}

	public User getCurrent_user() {
		return current_user;
	}

	public void setCurrent_user(User current_user) {
		this.current_user = current_user;
	}
	
	
	
}
