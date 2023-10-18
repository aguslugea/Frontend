//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';


@Component({
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css']
})


export class CursoListComponent implements OnInit {
  cursos: Curso[] = [];
  currentElement: Curso = {}; // Inicializado como un objeto vacío
  currentIndex = -1;
  title = '';
  cursosFiltrados: Curso[] = [];

  successMessage: string = '';
  errorMessage: string = '';
  constructor(private cursoService: CursoService) { }

  ngOnInit(): void {
    this.retrieveCursos();
  }

  retrieveCursos(): void {
    this.cursoService.getAll()
      .subscribe({
        next: (data) => {
          this.cursos = data;
          console.log(this.cursos);
          // Cuando obtienes nuevos datos, refresca automáticamente la lista filtrada
          this.searchTitle();
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveCursos();
    this.currentElement = {}; // Limpia el objeto individual
    this.currentIndex = -1;
  }

  setActiveElement(element: Curso, index: number): void {
    this.currentElement = element;
    this.currentIndex = index;
  }


removeAllElements(): void {
  if (confirm("¿Seguro que desea eliminar TODOS los registros?")) {
    this.cursoService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => {
          console.error('Error al eliminar los registros', e);
          this.errorMessage = 'Error al eliminar todos los registros';
        }
      });
  }
}


  searchTitle(): void {
    this.currentIndex = -1;
    
    this.cursosFiltrados = this.cursos.filter((curso) =>
      curso.nombre?.toLowerCase().includes(this.title.toLowerCase())
    );

    if (this.cursosFiltrados.length === 0) {
      console.log('No se encontraron cursos con el título especificado.');
    }
  }
  

  

}