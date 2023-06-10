import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Article } from 'app/models/article';

@Component({
  selector: 'app-article-new-template',
  templateUrl: './article-new-template.component.html',
  styleUrls: ['./article-new-template.component.css']
})

export class ArticleNewTemplateComponent {
  // Añadimos el modificador '!' para indicar que la propiedad será inicializada en algún momento antes de su uso
  public article!: Article;

  constructor() {}

  createArticle(articleForm: NgForm): void {
    // Comprobamos si el formulario es válido
    if (articleForm.valid) {
      // Asignamos el valor del formulario al objeto 'article'
      this.article = articleForm.value.article;
      // Verificamos si el campo 'isOnSale' ha sido rellenado y lo establecemos a 'false' por defecto
      if (typeof this.article.isOnSale === 'undefined') {
        this.article.isOnSale = false;
      }
      // Imprimimos en la consola el objeto 'article' creado
      console.log('Creando artículo', this.article);
    } else {
      // Si el formulario no es válido, se imprime un mensaje en la consola
      console.log('Formulario no válido');
    }
  }
}
