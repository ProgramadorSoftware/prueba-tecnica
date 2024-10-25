import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../service/project.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Project } from '../../model/project';
import { CreateFormsComponent } from '../create-forms/create-forms.component';

@Component({
  selector: 'app-edit-forms',
  standalone: true,
  imports: [CreateFormsComponent],

  templateUrl: './edit-forms.component.html',
  styleUrl: './edit-forms.component.css',
})
export class EditFormsComponent implements OnInit {
  tarea: Project | null = null;
  taskId!: number;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.taskId) {
      this.loadTarea(this.taskId);
    }
  }

  loadTarea(id: number): void {
    this.spinner.show();

    this.projectService.getTask(id).subscribe({
      next: (data) => {
        this.tarea = data[0];
        this.spinner.hide();
      },
      error: (err) => {
        console.error('Error al cargar tarea', err);
        this.spinner.hide();
      },
    });
  }
  editTask(updatedTask: Project) {
    this.spinner.show();
    this.projectService.editTask(this.taskId, updatedTask).subscribe({
      next: (response) => {
        console.log('Tarea editada exitosamente', response);
        this.spinner.hide();
        this.router.navigate(['/tareas']);
      },
      error: (err) => {
        console.error('Error al editar tarea', err);
        this.spinner.hide();
      },
    });
  }
}
