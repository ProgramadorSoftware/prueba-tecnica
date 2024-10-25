import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Project } from '../model/project';
import { HttpErrorHandlerService } from './httperrorhandler.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private producUrl = 'https://jsonplaceholder.typicode.com/users';
  private tasksUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(
    private http: HttpClient,
    private errorhandlerService: HttpErrorHandlerService
  ) {}

  getProduct(): Observable<any[]> {
    return this.http.get<any[]>(this.producUrl).pipe(
      catchError((error) => this.errorhandlerService.handleError(error)));
  }

  getTask(userId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.tasksUrl}?userId=${userId}`).pipe(
      catchError((error) => this.errorhandlerService.handleError(error)));
  }

 //eliminar
  deleteTask(taskId: number): Observable<any> {
    return this.http.delete<void>(`${this.tasksUrl}/${taskId}`).pipe(
      catchError((error) => this.errorhandlerService.handleError(error)));
  }

  editTask(taskId: number, updatedTask: Project): Observable<Project> {
    return this.http.put<Project>(`${this.tasksUrl}/${taskId}`, updatedTask).pipe(
      catchError((error) => this.errorhandlerService.handleError(error)));
  }
  saveTask(newTask: Project): Observable<Project> {
    return this.http.post<Project>(this.tasksUrl, newTask).pipe(
      catchError((error) => this.errorhandlerService.handleError(error)));
  }
}
