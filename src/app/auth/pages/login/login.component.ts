import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      mat-grid-list {
        max-heigth: 100vh;
      }
    `
  ]
})
export class LoginComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  login(): void {
    this.authService.login()
      .subscribe(userAuth => {
        console.log(userAuth);
        if (userAuth.id) {
          this.router.navigate(['/heroes/all']);
        }
      });
  }
}
