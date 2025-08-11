package com.tableroKanvan.demo.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tableroKanvan.demo.business.TableroKanvanService;
import com.tableroKanvan.demo.modelVO.TableroVO;
import com.tableroKanvan.demo.resources.Response;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
public class TableroKanvanController {
	@Autowired
	TableroKanvanService Service;
	
	@GetMapping("/hola")
    public String saludar() {
        return "¡Hola desde Spring Boot!";
    }
	
	@GetMapping("/Tablero/Tablero")
	public Response getPromociones(@RequestParam int idTipo) {
        return Service.getPromociones(idTipo);
    }
	
	@PostMapping("/Tablero/Tablero")
	public Response insertPromociones(@RequestBody List<TableroVO> tablero) {
        return Service.insertPromociones(tablero);
    }
	
	@PutMapping("/Tablero/Tablero")
	public Response updatePromociones(@RequestParam int idNoticia, @RequestParam int idTipo) {
        return Service.updatePromociones(idNoticia, idTipo);
    }
}
