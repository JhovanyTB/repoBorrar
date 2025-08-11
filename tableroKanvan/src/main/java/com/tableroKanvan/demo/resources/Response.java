package com.tableroKanvan.demo.resources;


public class Response {
	private int code;
	private String message;
	private Object objResponse;
	
	public int getCode() {
		return this.code;
	}
	
	public void setCode(int code) {
		this.code = code;
	}
	
	public String getMessage() {
		return this.message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}

	public Object getObjResponse() {
		return objResponse;
	}

	public void setObjResponse(Object objResponse) {
		this.objResponse = objResponse;
	}
}

