import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private appComponent: AppComponent, private location: Location) {}

  showArticleList() {
    // Establecemos el componente actual en 'articleList' en 'AppComponent'
    this.appComponent.currentComponent = 'articleList';
    // Navega a la ruta '/articleList' utilizando el servicio 'Location'
    this.location.go('/articleList');
  }

  showArticleNewTemplate() {
    // Establece el componente actual en 'newArticleTemplate' en 'AppComponent'
    this.appComponent.currentComponent = 'newArticleTemplate';
    // Navega a la ruta '/newArticleTemplate' utilizando el servicio 'Location'
    this.location.go('/newArticleTemplate');
  }

  showArticleNewReactive() {
    // Establece el componente actual en 'newArticleReactive' en 'AppComponent'
    this.appComponent.currentComponent = 'newArticleReactive';
    // Navega a la ruta '/newArticleReactive' utilizando el servicio 'Location'
    this.location.go('/newArticleReactive');
  }
}