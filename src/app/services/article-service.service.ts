import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articles: Article[] = [
    { 
      id: 1, 
      name: 'Nike Court Vision Low', 
      imageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/818bb456-4fb5-49c9-bc6c-51d7f4d0f371/court-vision-low-zapatillas-1xL2Lc.png',
      price: 45,
      isOnSale: true,
      quantityInCart: 0 
    },
    { id: 2, 
      name: 'Nike Dunk Low', 
      imageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ba65b84e-8236-42e1-a3a1-1396a0f4460e/dunk-low-zapatillas-fhBsJ7.png', 
      price: 120, 
      isOnSale: true, 
      quantityInCart: 0 
    },
    { id: 3, 
      name: 'Nike Waffle One Leather', 
      imageUrl: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/322e3673-cbb9-4eb4-865f-089e0a29dcda/waffle-one-leather-zapatillas-G28TpK.png', 
      price: 60, 
      isOnSale: false, 
      quantityInCart: 0 
    }
  ];

  getArticles(): Observable<Article[]> {
    return of(this.articles); // Simplemente devuelve los artículos como un Observable
  }

  changeQuantity(articleID: number, changeInQuantity: number): Observable<Article> {
    const articleIndex = this.articles.findIndex(article => article.id === articleID);
    if (articleIndex !== -1) {
      this.articles[articleIndex].quantityInCart += changeInQuantity;
      return of(this.articles[articleIndex]);
    }
    return throwError('El artículo no existe.');
  }

  create(article: Article): Observable<any> {
    // Aquí puedes agregar la lógica para crear un nuevo artículo, como realizar una solicitud HTTP
    // por ahora, simplemente devuelve un Observable vacío
    return of(null);
  }
}