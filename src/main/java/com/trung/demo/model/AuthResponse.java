package com.trung.demo.model;

public class AuthResponse {
	private String jwt;
	private String userNameErrMsg;
	private String passwordErrMsg;
	private boolean valid;
	private User current_user;
	
	public AuthResponse() { }
	
	public AuthResponse(String jwt, String userNameErrMsg, String passwordErrMsg, boolean valid, User current_user) {
		super();
		this.jwt = jwt;
		this.userNameErrMsg = userNameErrMsg;
		this.passwordErrMsg = passwordErrMsg;
		this.valid = valid;
		this.current_user = current_user;
	}

	public String getJwt() {
		return jwt;
	}

	public void setJwt(String jwt) {
		this.jwt = jwt;
	}

	public String getUserNameErrMsg() {
		return userNameErrMsg;
	}

	public void setUserNameErrMsg(String userNameErrMsg) {
		this.userNameErrMsg = userNameErrMsg;
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
