import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Por defecto, 'currentComponent' es el listado de artículos
  currentComponent = 'articleList';
}
