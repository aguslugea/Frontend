import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso.model';
import { Tema } from '../models/tema.model';
import { TemaService } from 'src/app/services/tema.service';

import { Material } from '../models/material.model';
import { MaterialService } from 'src/app/services/material.service';

const baseUrl = 'http://localhost:8080/cursos';
const baseTemasUrl = 'http://localhost:8080/temas';
const baseMaterialesUrl = 'http://localhost:8080/materiales';


@Injectable({
  providedIn: 'root'
})

export class CursoService {

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Curso[]> {
    return this.http.get<Curso[]>(baseUrl);
  }
  getTemasAll(): Observable<Tema[]> {
    return this.http.get<Tema[]>(baseTemasUrl);
}

   getMaterialesAll(): Observable<MaterialService[]> {
    return this.http.get<MaterialService[]>(baseMaterialesUrl);
	}
	
  get(id: any): Observable<Curso> {
    return this.http.get<Curso>(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
	console.log(data);
	//Conversione a form data
	//const formData = new FormData();
	//formData.append('title', <string>data.title);
    //formData.append('status', <string>data.status);
	//formData.append('content', <string>data.content);
    return this.http.post(`${baseUrl}`, data, {responseType: 'text'});
  }
  update(id: any, data: Curso): Observable<any> {
	//Conversione a form data
	const bodyData = {
		"id": id,
    	"nombre": data.nombre,
    	"fechaInicio": data.fechaInicio,
    	"idDocente": data.idDocente ,
    	"tema": data.tema
	};
    return this.http.put(`${baseUrl}`, bodyData, {responseType: 'text'});
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}`, {responseType: 'text'});
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(nombre: any): Observable<Curso> {
    return this.http.get<Curso>(`${baseUrl}?nombre=${nombre}`);
  }
  
 /* getMaterialesPorCurso(idCurso: number): Observable<Material[]> {
    return this.http.get<Material[]>(`/api/materiales/curso/${idCurso}`);
  }*/
  
    getMaterialesPorCurso(idCurso: number): Observable<Material[]> {
    return this.http.get<Material[]>(`/materiales/curso/${idCurso}`);
  }
  
  getDocenteNombre(idDocente: number): Observable<string> {
  return this.http.get<string>(`/api/docentes/${idDocente}/nombre`);
 }
}
