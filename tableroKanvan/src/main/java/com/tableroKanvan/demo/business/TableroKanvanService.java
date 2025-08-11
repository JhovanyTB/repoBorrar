package com.tableroKanvan.demo.business;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tableroKanvan.demo.modelVO.TableroVO;
import com.tableroKanvan.demo.resources.Constantes;
import com.tableroKanvan.demo.resources.Response;
import com.tableroKanvan.demo.resources.StoreProcedure;

@Service
public class TableroKanvanService {
	@Autowired
    private StoreProcedure storedProcedureExecutor;
	
	private static final Logger logger = LoggerFactory.getLogger(TableroKanvanService.class);
	
	public Response getPromociones(int idTipo) {
    	ArrayList<TableroVO> arreglo = new ArrayList <>();
        Response response = new Response();
        response.setObjResponse(arreglo);
        Map<String, Object> parametros= new LinkedHashMap<>();
    	parametros.put("p_idPromocion", idTipo);
        //Validaciones
        try {
        	List<TableroVO> obj = storedProcedureExecutor.query("getNoticias", TableroVO.class, parametros);
        	response.setCode(Constantes.EXITOSO);
        	response.setMessage(Constantes.ok);
	    	response.setObjResponse(obj);
	    	obj.get(0);
    	}
    	catch(IndexOutOfBoundsException ex) {
    		response.setCode(Constantes.EXITOSO);
    		response.setMessage(Constantes.listaVacia);
    	}
    	catch(Exception e) {
    		response.setCode(Constantes.NO_EXITOSO);
    		response.setMessage(Constantes.errorConexionBD);
    		logger.error(e.getMessage());
    	}
        return response;
    }
	
	public Response insertPromociones(List<TableroVO> obj) {
    	Response response = new Response();
    	int result = 1;
    	//Validaciones
    	for(int i = 0; i < obj.size(); i ++) {
    		Map<String, Object> parametros= new LinkedHashMap<>();
        	parametros.put("p_autor", obj.get(i).getAutor());
        	parametros.put("p_contenido", obj.get(i).getContenido());
        	parametros.put("p_descripcion", obj.get(i).getDescripcion());
        	parametros.put("p_fecha", obj.get(i).getFecha());
        	parametros.put("p_fuente", obj.get(i).getFuente());
        	parametros.put("p_titulo", obj.get(i).getTitulo());
        	parametros.put("p_url", obj.get(i).getUrl());
        	parametros.put("p_urlImagen", obj.get(i).getUrlImagen());
        	int aux = storedProcedureExecutor.exec("insertNoticia", parametros);
        	result = aux <= 0 ? aux : result;
    	}
    	response.setCode(result);
    	if(result > 0) {
    		response.setCode(Constantes.EXITOSO);
    		response.setMessage(Constantes.ok);
    	}else {
    		response.setCode(Constantes.NO_EXITOSO);
    		response.setMessage(Constantes.errorConsulta);
    	}
    	return response;
    }
	
	public Response updatePromociones(int idNoticia, int idTipo) {
    	Response response = new Response();
    	//Validaciones
    	Map<String, Object> parametros= new LinkedHashMap<>();
    	parametros.put("p_idNoticia", idNoticia);
    	parametros.put("p_idTipo", idTipo);
    	int result = storedProcedureExecutor.exec("updateNoticia", parametros);
    	response.setCode(result);
    	if(result > 0) {
    		response.setCode(Constantes.EXITOSO);
    		response.setMessage(Constantes.ok);
    	}else {
    		response.setCode(Constantes.NO_EXITOSO);
    		response.setMessage(Constantes.errorConsulta);
    	}
    	return response;
    }
	
}
