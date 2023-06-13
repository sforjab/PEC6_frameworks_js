import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article';

// Se proporciona el servicio en el nivel raíz de la aplicación
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  // URL de la API
  private apiUrl = 'http://localhost:3000/api/articles';

  // Constructor de la clase ArticleService que recibe una instancia de HttpClient
  constructor(private http: HttpClient) {}

  
  // Obtenemos los artículos existentes en el servidor. Se devuelve un Observable de tipo 'Article[]'
  // Añadimos un parámetro opcional a 'getArticles' para realizar la búsqueda del término indicado
  getArticles(searchTerm?: string): Observable<Article[]> {
    let url = this.apiUrl;

    // En caso de existir término de búsqueda, actualizamos la URL con el parámetro 'q' y el término
    if (searchTerm) {
      url += `?q=${searchTerm}`;
    }

    return this.http.get<Article[]>(url);
  }

  // Actualizamos la cantidad de un artículo en el servidor. Se devuelve un Observable de tipo 'Article'
  changeQuantity(articleID: number, changeInQuantity: number): Observable<Article> {
    // Añadimos a la URL original el 'id' del artículo que recibimos por parámetro
    const url = `${this.apiUrl}/${articleID}`;
    // Creamos un objeto 'data' con la propiedad 'changeInQuantity' que contendrá la cantidad a cambiar
    const data = { changeInQuantity };

    return this.http.patch<Article>(url, data);
  }

  // Creamos un nuevo artículo en el servidor. Devuelve un Observable de tipo 'any'
  create(article: Article): Observable<any> {
    return this.http.post<Article>(this.apiUrl, article);
  }
}
