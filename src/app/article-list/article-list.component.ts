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
  // Añadimos el modificador '!' para indicar que la propiedad será inicializada en algún momento antes de su uso
  articles$!: Observable<Article[]> ;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articles$ = this.articleService.getArticles();
  }
}