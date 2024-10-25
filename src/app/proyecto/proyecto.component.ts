import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProjectService } from '../service/project.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { Project } from '../model/project';
import { CreateFormsComponent } from "../forms/create-forms/create-forms.component";
import { MenuComponent } from '../menu/menu.component';
import { HttpErrorHandlerService } from '../service/httperrorhandler.service';

@Component({
  selector: 'app-proyecto',
  standalone: true,
  imports: [
    TableModule,
    HttpClientModule,
    RippleModule,
    ButtonModule,
    CreateFormsComponent,
    MenuComponent
],
  templateUrl: './proyecto.component.html',
  styleUrl: './proyecto.component.css'
})
export class ProyectoComponent implements OnInit {
  saveProject(nuevatarea: Project){
    console.log('Saved task:', nuevatarea);
  }
  project: any[] = [];

  constructor (
    private projectService: ProjectService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private errorhandlerService: HttpErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.list();
  }
  list() {
    this.spinner.show();
    this.projectService.getProduct().subscribe({
      next: (response: any) => {
        this.project = response;
        this.spinner.hide();
      },
      error: (error: any) => {
        this.spinner.hide();
        this.errorhandlerService.handleError(error);
      }
    });
  }

  task(id: number) {
    this.router.navigate(['/task', id]);
  }
}
