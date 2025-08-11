package com.tableroKanvan.demo.resources;

import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.StoredProcedureQuery;

import org.springframework.stereotype.Component;

import com.tableroKanvan.demo.business.TableroKanvanService;

import java.lang.reflect.Constructor;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class StoreProcedure {
	
	private static final Logger logger = LoggerFactory.getLogger(TableroKanvanService.class);
	@PersistenceContext
	private EntityManager entityManager;

	/**
	 * Ejecuta un stored procedure que puede contener operaciones de insert, delete o update, y devuelve un SYS_REFCURSOS como único parametro de salida
	 * @param procedureName Nombre del procedimiento almacenado.
	 * @param parametros que puede o no requerir el stored procedure
	 * @return integer para indicar el número de filas afcetadas en la consulta o si hubo un error en la misma
	 */
	public int exec(String procedureName, Map<String, Object> parametros) {
		StoredProcedureQuery query = entityManager.createStoredProcedureQuery(procedureName);

		if (parametros != null) {
			logger.error("Stored Procedure{}",parametros);
	        for (Map.Entry<String, Object> entry : parametros.entrySet()) {
	            String nombre = entry.getKey();
	            Object valor = entry.getValue();
	            query.registerStoredProcedureParameter(nombre, valor.getClass(), ParameterMode.IN);
	            query.setParameter(nombre, valor);
	        }
	    }
		
		query.registerStoredProcedureParameter("p_resultado", Integer.class, ParameterMode.OUT);
		
		query.execute();
		Integer resultado = (Integer) query.getOutputParameterValue("p_resultado");
		logger.error("resultado: {}", resultado);
		return resultado;
	}
	
	
	
	/**
     * Ejecuta un stored procedure que contiene un query insert, y devuelve un SYS_REFCURSOR como único parámetro de salida.
     *
     * @param procedureName Nombre del procedimiento almacenado.
     * @param tipoResultado como objeto al cuál se va a mapear el resultado
     * @param parametros que puede o no requerir el stored procedure
     * @param cursorParamName Nombre del parámetro OUT del cursor (ej. "p_resultado").
     * @return Lista de filas como Object[] (cada fila del cursor).
     */
	public <T> List<T> query(String procedureName, Class<T> tipoResultado, Map<String, Object> parametros) {
	    StoredProcedureQuery query = entityManager.createStoredProcedureQuery(procedureName);

	    // Registrar y establecer parámetros de entrada si los hay
	    if (parametros != null) {
	        for (Map.Entry<String, Object> entry : parametros.entrySet()) {
	            String nombre = entry.getKey();
	            Object valor = entry.getValue();
	            query.registerStoredProcedureParameter(nombre, valor.getClass(), ParameterMode.IN);
	            query.setParameter(nombre, valor);
	        }
	    }
	    
	    // Registrar el parámetro de salida
	    query.registerStoredProcedureParameter("p_resultado", void.class, ParameterMode.REF_CURSOR);
	    
	    query.execute();

	    List<Object[]> filas = query.getResultList();
	    List<T> resultados = new ArrayList<>();

	    for (Object[] fila : filas) {
	        T instancia = mapearFilaAFilaVO(fila, tipoResultado);
	        resultados.add(instancia);
	    }

	    return resultados;
	}
	
	private <T> T mapearFilaAFilaVO(Object[] fila, Class<T> tipo) {
		int fil=0;
		
		try {
	        // Busca un constructor que tenga el mismo número de parámetros que columnas
	        for (Constructor<?> constructor : tipo.getConstructors()) {
	            if (constructor.getParameterCount() == fila.length) {
	            	Object[] parametros = new Object[fila.length];
	            	for (int i = 0; i < fila.length; i++) {
	                    Class<?> paramType = constructor.getParameterTypes()[i];
	                    parametros[i] = convertirValor(fila[i], paramType);
	                }
	                return (T) constructor.newInstance(parametros);
	            }
	        }

	        throw new RuntimeException("No se encontró un constructor compatible para " + tipo.getName());
	    } catch (Exception e) {
	        throw new RuntimeException(e);
	    }
	}
	
	private Object convertirValor(Object valor, Class<?> tipoDestino) {
	    if (valor == null) {
	        return null;
	    }

	    // Verificar los tipos y hacer la conversión
	    if (tipoDestino.equals(String.class)) {
	        return valor.toString();
	    } else if (tipoDestino.equals(Integer.class) || tipoDestino.equals(int.class)) {
	        return Integer.parseInt(valor.toString());
	    } else if (tipoDestino.equals(Double.class) || tipoDestino.equals(double.class)) {
	        return Double.parseDouble(valor.toString());
	    } else if (tipoDestino.equals(Long.class) || tipoDestino.equals(long.class)) {
	        return Long.parseLong(valor.toString());
	    }else if (tipoDestino.equals(BigDecimal.class)) {
	        return new BigDecimal(valor.toString());
	    }else if (tipoDestino.equals(Boolean.class) || tipoDestino.equals(boolean.class)) {
	        return Boolean.parseBoolean(valor.toString());
	    } else if (tipoDestino.equals(ZonedDateTime.class)) {
	        if (valor instanceof ZonedDateTime) {
	            return valor;  // Si ya es un Timestamp, simplemente lo regresamos
	        }
	    }
	    
	    // Si el tipo no es reconocido, intentamos usar el método de conversión por defecto
	    return tipoDestino.cast(valor);
	}
	
}
