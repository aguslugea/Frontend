import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/models/curso.model';

@Component({
  selector: 'app-curso-details',
  templateUrl: './curso-details.component.html',
  styleUrls: ['./curso-details.component.css']
})
export class CursoDetailsComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentElement: Curso = <Curso>{
    title: '',
    status: 'draft',
    content: '',
 
  };
  


  successMessage = '';
  errorMessage = '';
  message: string = ''; 
  confirmDelete = false;
    
 // curso: any;
    
 curso: Curso = <Curso>{ fechaInicio: undefined};
  
  constructor(
    private cursoService: CursoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.successMessage = '';
      this.getElement(this.route.snapshot.params["id"]);
    }
  }

  getElement(id: string): void {
    this.cursoService.get(id)
      .subscribe({
        next: (data) => {
          this.currentElement = data;
          console.log(data);
        },
        error: (e) => {
          console.error(e);
          this.errorMessage = 'Error al obtener el elemento.';
        }
      });
  }

  updateElement(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.cursoService.update(this.currentElement.id, this.currentElement)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.successMessage = res.message ? res.message : 'Curso actualizado exitosamente!';
         /* this.router.navigate(['/cursos']);*/
        },
        error: (e) => {
          console.error(e);
          this.errorMessage = 'Error al actualizar el elemento.';
        }
      });
  }

/*  deleteElement(): void {
    this.cursoService.delete(this.currentElement.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/cursos']);
        },
        error: (e) => {
          console.error(e);
          this.errorMessage = 'Error al eliminar el elemento.';
        }
      });
  }
*/

  deleteElement(): void {
   if (confirm("¿Seguro que desea eliminar el registro?")) {
    this.cursoService.delete(this.currentElement.id)
      .subscribe({
        next: (res) => {
          console.log(res);
           this.successMessage = res.message ? res.message : 'Registro eliminado';
        },
        error: (e) => {
          console.error(e);
          this.errorMessage = 'Error al eliminar el elemento.';
        }
      });
  }
}
/*removeIt(): void {
  if (confirm("¿Seguro que desea eliminar el registro?")) {
    this.cursoService.deleteCurso(this.currentElement.id)
      .subscribe({
        next: (res) => {
          console.log(res);
           this.successMessage = res.message ? res.message : 'Registro eliminado';
        },
        error: (e) => {
          console.error('Error al eliminar el registro', e);
          this.errorMessage = 'Error al eliminar el registro';
        }
      });
  }
}*/

  clearMessage(): void {
    this.successMessage = '';
    this.errorMessage = '';
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