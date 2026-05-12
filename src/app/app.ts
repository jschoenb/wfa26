import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {Authentication} from './shared/authentication';

@Component({
  selector: 'bs-root',
  imports: [RouterOutlet, MatTabLink, RouterLink, RouterLinkActive, MatTabNav, MatTabNavPanel],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private authService = inject(Authentication);
  protected getLoginLabel() {
    return this.isLoggedIn()? "Logout": "Login";
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
