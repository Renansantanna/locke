import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { ViewArticleComponent } from './view-article/view-article.component';
// import { ListArticlesComponent } from './list-articles/list-articles.component';

const routes: Routes = [  
  {
    path: 'editor',
    component: ArticleEditorComponent
  },
  {
    path: 'view/:article',
    component: ViewArticleComponent
  },/*
  {
    path: 'articles/:queryBy/:param',
    component: ListArticlesComponent
  },*/
  {
  	path: '**',
  	redirectTo: 'editor',
 		pathMatch: 'full'
  },
  {
  	path: '',
  	redirectTo: 'editor',
 		pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
