import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports:
  [
    MenubarModule,
    ButtonModule,
    TabMenuModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.items = [
      { label: 'Inicio', icon: 'pi pi-home', routerLink: '/proyecto' },
      { label: 'Salir', icon: 'pi pi-times-circle', command: () => this.onLogout()  },
    ];
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
