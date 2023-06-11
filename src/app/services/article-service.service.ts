import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:3000/api/articles'; // URL de la API

  constructor(private http: HttpClient) {}

  // Añadimos un parámetro opcional a 'getArticles' para realizar la búsqueda del término indicado
  getArticles(searchTerm?: string): Observable<Article[]> {
    /* return this.http.get<Article[]>(this.apiUrl); */
    let url = '/api/articles';

    if (searchTerm) {
      url += `?q=${searchTerm}`;
    }

    return this.http.get<Article[]>(url);
  }

  changeQuantity(articleID: number, changeInQuantity: number): Observable<Article> {
    const url = `${this.apiUrl}/${articleID}`;
    const data = { changeInQuantity };

    return this.http.patch<Article>(url, data);
  }

  create(article: Article): Observable<any> {
    return this.http.post<Article>(this.apiUrl, article);
  }
}
