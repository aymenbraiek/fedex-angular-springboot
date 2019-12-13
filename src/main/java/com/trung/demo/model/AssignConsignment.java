package com.trung.demo.model;

public class AssignConsignment {
	private String userEmail;
	private Consignment consignment;
	
	public AssignConsignment() {}
	
	public AssignConsignment(String userEmail, Consignment consignment) {
		super();
		this.userEmail = userEmail;
		this.consignment = consignment;
	}
	
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public Consignment getConsignment() {
		return consignment;
	}
	public void setConsignment(Consignment consignment) {
		this.consignment = consignment;
	}
	
	
}
