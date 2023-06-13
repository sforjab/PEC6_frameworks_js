import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Article } from '../models/article';
import { DefaultImagePipe } from 'app/pipes/default-image.pipe';
import { ArticleService } from 'app/services/article-service.service';

// Utilizamos template y estilos en línea. También establecemos un mecanismo de detección de cambios más óptimo (OnPush)
// Empleamos los 'pipes' adecuados para mostrar la imagen por defecto (pipe personalizado) y el valor con dos decimales y el símbolo del euro
@Component({
  selector: 'app-article-item',
  template: `
  <div class="container">
    <div class="article-item-container"
    [class]="article.isOnSale ? 'onSale' : ''">
        <img [src]="article.imageUrl | defaultImage" [alt]="article.name" />
        <div class="name">{{ article.name }}</div>
        <div class="price" [ngClass]="{'unavalaible': !article.isOnSale}">
          {{ article.price | number: '1.2-2' | currency: 'EUR': 'symbol' }}
        </div>
        <div class="quantity-container" *ngIf="article.isOnSale">
            <button (click)="decrement()" [disabled]="article.quantityInCart === 0">-</button>
            <div class="quantityInCart">{{ article.quantityInCart }}</div>
            <button (click)="increment()">+</button>
        </div>
    </div>
  </div>
  `,
  styles: [
  `
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .article-item-container {
      border: 1px solid black;
      border-radius: 5px;
      display: inline-block;
      padding: 10px;
      text-align: center;
      width: 70%;
  }

  .onSale {
      background-color: #10d1df;
  }

  .article-item-container img {
      width: 80%;
  }

  .unavalaible {
      color: #d3d3d3;
  }

  .name {
    font-size: 1.2rem;
    font-weight: bold;
    padding: 0.8rem 0;
  }

  .quantity-container {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.8rem 0;
  }

  .quantityInCart {
      margin: 0 1rem;
  }
  `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Se utiliza el proveedor 'DefaultImagePipe' para proporcionar el Pipe personalizado 'DefaultImagePipe' al componente
  providers: [DefaultImagePipe]
})
export class ArticleItemComponent {
  // El componente recibe un objeto Article mediante la directiva @Input()
   // Añadimos el modificador '!' para indicar que la propiedad será inicializada en algún momento antes de su uso
  @Input() article!: Article;

 constructor(private articleService: ArticleService) {}

 // Método que se ejecuta al pulsar el botón '-' para decrementar la cantidad de artículos en el carrito
 decrement(): void {
  // Si la cantidad de artículos es mayor que cero...
  if (this.article.quantityInCart > 0) {
    // Actualizamos el valor local de 'quantityInCart' restando una unidad
    this.article.quantityInCart--;
    // Llamamos al servicio para actualizar en el servidor el valor de 'quantityInCart' para el artículo actual
    this.articleService.changeQuantity(this.article.id, -1)
      .subscribe(() => {
        console.log('Cantidad actualizada en el servidor');
      }, (error) => {
        console.error('Error al actualizar la cantidad en el servidor:', error);
        // Revertimos los cambios locales en caso de error
        this.article.quantityInCart += 1;
      });
  }
 }

 // Método que se ejecuta al pulsar el botón '+' para incrementar la cantidad de artículos en el carrito
 increment(): void {
  // Actualizamos el valor local de 'quantityInCart' sumando una unidad
  this.article.quantityInCart++;
  // Llamamos al servicio para actualizar en el servidor el valor de 'quantityInCart' para el artículo actual
  this.articleService.changeQuantity(this.article.id, 1)
    .subscribe(() => {
      console.log('Cantidad actualizada en el servidor');
    }, (error) => {
      console.error('Error al actualizar la cantidad en el servidor:', error);
      // Revertimos los cambios locales en caso de error
      this.article.quantityInCart -= 1;
    });
 }
}
