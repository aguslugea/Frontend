

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/materiales';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {


  constructor(private http: HttpClient) {}

  
   getAll(): Observable<MaterialService[]> {
    return this.http.get<MaterialService[]>(baseUrl);
	}
}