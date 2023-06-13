import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { ArticleService } from 'app/services/article-service.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit{
  // Propiedad observable que contendrá la lista de artículos
  // Añadimos el modificador '!' para indicar que la propiedad será inicializada en algún momento antes de su uso
  articles$!: Observable<Article[]> ;

  // Término de búsqueda para filtrar los artículos
  searchTerm: string = '';

  constructor(private articleService: ArticleService) { }

  // Obtenemos la lista de artículos al inicializar el componente
  ngOnInit(): void {
    this.articles$ = this.articleService.getArticles();
  }

  // Obtenemos la lista de artículos filtrados por el término de búsqueda
  onSearch(): void {
    this.articles$ = this.articleService.getArticles(this.searchTerm);
  }
}