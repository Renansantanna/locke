import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { ViewArticleComponent } from './view-article/view-article.component';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { CallbackComponent } from './callback/callback.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [  
  {
    path: `home`,
    component: HomeComponent
  },
  {
    path: 'editor',
    component: ArticleEditorComponent
  },
  {
    path: 'view/:article',
    component: ViewArticleComponent
  },
  {
    path: 'articles',
    component: ListArticlesComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
  	path: '**',
  	redirectTo: 'home',
 		pathMatch: 'full'
  },
  {
  	path: '',
  	redirectTo: 'home',
 		pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
