
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/temas';
//const baseUrl = 'http://localhost:8080/cursos';

@Injectable({
  providedIn: 'root',
})
export class TemaService {


  constructor(private http: HttpClient) {}

  
   getAll(): Observable<TemaService[]> {
    return this.http.get<TemaService[]>(baseUrl);
}
}
