import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FloatLabelModule } from "primeng/floatlabel"

// componentes
import { LoginComponent } from "./login/login.component";
import { ProyectoComponent } from "./proyecto/proyecto.component";
import { MenuComponent } from "./menu/menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FloatLabelModule,
    LoginComponent,
    ProyectoComponent,
    MenuComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prueba-tecnica';
}
