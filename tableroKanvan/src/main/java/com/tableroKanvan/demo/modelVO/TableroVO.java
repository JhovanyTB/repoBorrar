package com.tableroKanvan.demo.modelVO;

import java.math.BigDecimal;

public class TableroVO {
	private BigDecimal idNoticia;
	private String autor;
	private String contenido;
	private String descripcion;
	private String fecha;
	private String fuente;
	private String titulo;
	private String url;
	private String urlImagen;
	
	public TableroVO(BigDecimal idNoticia, String autor, String contenido, String descripcion, String fecha, String fuente, String titulo, String url, String urlImagen) {
		this.idNoticia = idNoticia;
		this.autor = autor;
		this.contenido = contenido;
		this.descripcion = descripcion;
		this.fecha = fecha;
		this.fuente = fuente;
		this.titulo = titulo;
		this.url = url;
		this.urlImagen = urlImagen;
	}
	
	public BigDecimal getIdNoticia(){
		return idNoticia;
	}
	
	public void setIdNoticia(BigDecimal idNoticia) {
		this.idNoticia = idNoticia;
	}
	
	public String getFecha(){
		return fecha;
	}
	
	public void setFecha(String fecha){
		this.fecha = fecha;
	}
	
	public String getDescripcion(){
		return descripcion;
	}
	
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	
	public String getContenido(){
		return contenido;
	}
	
	public void setContenido(String contenido){
		this.contenido = contenido;
	}
	
	public void setFuente(String fuente) {
		this.fuente = fuente;
	}
	
	public String getFuente(){
		return fuente;
	}
	
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	
	public String getTitulo(){
		return titulo;
	}
	
	public void setUrl(String url) {
		this.url = url;
	}
	
	public String getUrl(){
		return url;
	}
	
	public void setUrlImagen(String urlImagen) {
		this.urlImagen = urlImagen;
	}
	
	public String getUrlImagen(){
		return urlImagen;
	}
	
	public void setAutor(String autor) {
		this.autor = autor;
	}
	
	public String getAutor(){
		return autor;
	}
	
}
