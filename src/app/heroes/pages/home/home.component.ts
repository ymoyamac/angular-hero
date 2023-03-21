import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .home-container {
        margin: 1rem
      }
    `
  ]
})
export class HomeComponent {

  userAuth!: User;

  get userActive() {
    return this.authService.userAuth;
  }

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  logout(): void {
    this.router.navigate(['/auth/login']);
  }

}
