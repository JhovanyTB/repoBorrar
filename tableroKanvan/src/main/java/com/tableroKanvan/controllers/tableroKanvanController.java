package com.tableroKanvan.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tableroKanvan.business.tableroKanvanService;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
public class tableroKanvanController {
	@Autowired
	tableroKanvanService Service;
	
	@GetMapping("/hola")
    public String saludar() {
        return "¡Hola desde Spring Boot!";
    }
}
