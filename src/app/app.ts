import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';

@Component({
  selector: 'bs-root',
  imports: [RouterOutlet, MatTabLink, RouterLink, RouterLinkActive, MatTabNav, MatTabNavPanel],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
