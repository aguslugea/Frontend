
import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';

import { TemaService } from 'src/app/services/tema.service';
import { Tema } from 'src/app/models/tema.model';

import { MaterialService } from 'src/app/services/material.service';
import { Material } from 'src/app/models/material.model';


@Component({
  selector: 'app-curso-add',
  templateUrl: './curso-add.component.html',
  styleUrls: ['./curso-add.component.css']
})
export class CursoAddComponent implements OnInit {
    [x: string]: any;
  curso: Curso = <Curso>{
    nombre: '',
    fechaInicio: new Date(),
    idDocente: 1, //campo obligatorio
    tema: {
            id: 2 //campo obligatorio
        },
     
  };

  
  temas: Tema[] = [];
  materiales: Material[] = [];
  selectedCursoId: number | null = null;
  
  submitted = false;
 
 //hardore --> eliminado
 // temas: any[] = [];
/*   temas = [{
    "id": 1,
    "nombre": "Programación en C++",
    "duracion": 12
  },
  {
    "id": 2,
    "nombre": "Diseño de Sistemas",
    "duracion": 36 }];*/
 
 docentes = [
  { id: 1, nombre: 'Sergio Viera' },
  { id: 2, nombre: 'Santiago Raggazzo' }, 
  { id: 3, nombre: 'Marcelo Badino' }, ];

  successMessage: string = '';
  errorMessage: string = '';
    
  
  constructor(private cursoService: CursoService) { }
  ngOnInit(): void {
	  this.getTemas();
  }
  saveCurso(): void {
	const data = {
		"id": this.curso.id,
    	"nombre": this.curso.nombre,
    	"fechaInicio": this.curso.fechaInicio,
    	"idDocente": this.curso.idDocente ,
    	"tema": this.curso.tema
	};	
    this.cursoService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) =>
        {
        	console.error('Error al guardar el curso', Error);
             this.errorMessage = 'Error al guardar el curso - Verifique los datos ingresados';
		} 
      });
  }
  newCurso(): void {
    this.submitted = false;
    this.curso = <Curso>{
    	nombre: '',
    	fechaInicio: new Date(),
    	idDocente: 1, //campo obligatorio
    	tema: {
            id: 2 //campo obligatorio
        }
    };
  }

//traigo los temas de la base  
   getTemas(): void {
    this.cursoService.getTemasAll()
      .subscribe({
        next: (data: Tema[]) => {
        this.temas = data;
        console.log(this.temas);
      },
        error: (e) => console.error(e)
      });
  }
  

onCursoSelect() {

    if (this.selectedCursoId !== null) {
		console.log(this.selectedCursoId);		
      this.cursoService.getMaterialesPorCurso(this.selectedCursoId).subscribe((materiales) => {
        this.materiales = materiales;
      });
    } else {
      this.materiales = [];
    }
  }
  
  fechaInicioInvalid = false;

  validateFechaInicio() {
  if (this.curso.fechaInicio) {
    const fechaIngresada = new Date(this.curso.fechaInicio);
    const fechaActual = new Date();

    if (fechaIngresada < fechaActual) {
      this.fechaInicioInvalid = true;
    } else {
      this.fechaInicioInvalid = false;
    }
  } else {
  
  }
}
  
}


