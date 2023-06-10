import { Article } from '../models/article'

export interface ArticleQuantityChange {
    article: Article;
    quantity: number;
  }