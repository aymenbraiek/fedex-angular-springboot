package com.trung.demo.model;

import java.util.Map;

public class AuthResponse {
	private String jwt;
	private Map<String, Object> res;
	
	public AuthResponse() { }
	
	public AuthResponse(Map<String, Object> res, String jwt) {
		super();
		this.res = res;
		this.jwt = jwt;
	}
	
	public Map<String, Object> getRes() {
		return res;
	}
	
	public void setRes(Map<String, Object> res) {
		this.res = res;
	}

	public String getJwt() {
		return jwt;
	}
	
	public void setJwt(String jwt) {
		this.jwt = jwt;
	}
	
}
