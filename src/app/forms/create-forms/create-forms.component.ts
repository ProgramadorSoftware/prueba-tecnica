import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { FieldsetModule } from 'primeng/fieldset';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Project } from '../../model/project';
import { ProjectService } from '../../service/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-forms',
  standalone: true,
  imports: [
    FieldsetModule,
    FloatLabelModule,
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    FormsModule,
    CheckboxModule,
  ],
  templateUrl: './create-forms.component.html',
  styleUrl: './create-forms.component.css',
})
export class CreateFormsComponent implements OnInit {
  @Input() tarea: Project | null = null;
  @Output() saveTask = new EventEmitter<Project>();

  tareaForm: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.tareaForm = this.formbuilder.group({
      title: ['', Validators.required],
      completed: [false],
    });
  }

  ngOnInit(): void {
    if (this.tarea) {
      this.tareaForm.patchValue({
        title: this.tarea.title,
        completed: this.tarea.completed,
      });
    }
  }

  get title() {
    return this.tareaForm.get('title');
  }

  submit() {
    if (this.tareaForm.valid) {
      this.projectService.saveTask(this.tareaForm.value).subscribe({
        next: (newTask: Project) => {
          this.router.navigate(['/proyecto']);
        },
        error: (error) => {
          console.error('Error al guardar la tarea:', error);
        },
      });
    }
  }
}
