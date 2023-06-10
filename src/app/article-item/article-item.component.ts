import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Article } from '../models/article';

// Utilizamos template y estilos en línea. También establecemos un mecanismo de detección de cambios más óptimo (OnPush)
@Component({
  selector: 'app-article-item',
  template: `
  <div class="container">
    <div class="article-item-container"
    [class]="article.isOnSale ? 'onSale' : ''">
        <img [src]="article.imageUrl" [alt]="article.name" />
        <div class="name">{{ article.name }}</div>
        <div class="price" [ngClass]="{'unavalaible': !article.isOnSale}">{{ article.price }} €</div>
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleItemComponent {
   // El componente recibe un objeto Article mediante la directiva @Input()
  @Input() article: Article;
  // El componente emite un evento cada vez que se actualiza la cantidad de artículos en el carrito mediante la directiva @Output()
  @Output() articleQuantityChange = new EventEmitter<{ article: Article, quantity: number }> ();

  constructor() {
    // Por defecto inicializamos el artículo con valores de ejemplo
    this.article = {
      id: 1,
      name: 'Nike Court Vision Low',
      imageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/818bb456-4fb5-49c9-bc6c-51d7f4d0f371/court-vision-low-zapatillas-1xL2Lc.png',
      price: 45,
      isOnSale: false,
      quantityInCart: 0
    };
  }

  // Método que se ejecuta al pulsar el botón '-' para decrementar la cantidad de artículos en el carrito
  decrement(): void {
    if (this.article.quantityInCart > 0) {
      // Se actualiza la cantidad de artículos en el carrito y se emite el evento articleQuantityChange
      this.article.quantityInCart--;
      this.articleQuantityChange.emit({ article: this.article, quantity: this.article.quantityInCart });
    }
  }

  // Método que se ejecuta al pulsar el botón '+' para incrementar la cantidad de artículos en el carrito
  increment(): void {
    // Se actualiza la cantidad de artículos en el carrito y se emite el evento articleQuantityChange
    this.article.quantityInCart++;
    this.articleQuantityChange.emit({ article: this.article, quantity: this.article.quantityInCart });
  }

}
