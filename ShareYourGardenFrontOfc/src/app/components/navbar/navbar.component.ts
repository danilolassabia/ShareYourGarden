import {
  Component,
  Inject,
  PLATFORM_ID,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  navItems: { path: string; name: string }[] = [];
  logoPath = '/login'
  private routerSubscription!: Subscription;
  loginService = inject(LoginService);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setNavItems();

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setNavItems();
      }
    });
  }

  setNavItems() {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.loginService.getToken();
      const gardener = this.loginService.getLoggedGardener();
      if (token) {
        this.navItems = [
          {
            path: '/about',
            name: 'Sobre',
          },
          {
            path: `/garden/${gardener.id}`,
            name: 'Meu Jardim',
          },
          {
            path: '/plants',
            name: 'Lista de Plantas',
          },
          {
            path: '/gardeners',
            name: 'Outros Usuários',
          },
        ];
        this.logoPath = `/garden/${gardener.id}`
      } else {
        this.navItems = [
          {
            path: '/about',
            name: 'Sobre',
          },
          {
            path: '/plants',
            name: 'Lista de Plantas',
          },
        ];
        this.logoPath = '/login'
      }
    }
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
