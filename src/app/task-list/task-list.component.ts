import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../service/project.service';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MenuComponent } from "../menu/menu.component";
import { HttpErrorHandlerService } from '../service/httperrorhandler.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports:
  [
    TableModule,
    HttpClientModule,
    CheckboxModule,
    FormsModule,
    ButtonModule,
    MenuComponent
  ],
  providers:
  [
    ConfirmationService,
    MessageService
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  projectId!: number;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private errorhandlerService: HttpErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('id')!;
      this.taskList();
  }

  taskList() {
    this.spinner.show();
    this.projectService.getTask(this.projectId).subscribe({
      next: (response) => {
        this.tasks = response;
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        this.errorhandlerService.handleError(error);
      }
    });
  }

  update(taskId: number) {
    this.router.navigate(['/updatetask', taskId]);
  }

  confirmDelete(id: number) {
    const confirmDelete = confirm('Seguro de eliminar la tarea');
    if (confirmDelete) {
      this.deleteTask(id);
    }
  }

  deleteTask(id: number) {
    this.projectService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(item => item.id !== id);
        alert('Eliminado con éxito.');
      },
      error: (error) => {
        this.errorhandlerService.handleError(error);
        alert('Error al eliminar.');
      },
    });
  }

  getCrear(): void{
    this.router.navigate(['/crearuser'])
  }
}
