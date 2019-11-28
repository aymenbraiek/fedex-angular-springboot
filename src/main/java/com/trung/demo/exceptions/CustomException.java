package com.trung.demo.exceptions;

import com.trung.demo.model.AuthResponse;

public class CustomException extends RuntimeException {
	private AuthResponse authRes;
	
	public CustomException(AuthResponse authRes) {
		this.authRes = authRes;
	}
	
	public AuthResponse getAuthRes() {
		return authRes;
	}
	
	public void setAuthRes(AuthResponse authRes) {
		this.authRes = authRes;
	}
}
