import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { ViewArticleComponent } from './view-article/view-article.component';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { CallbackComponent } from './callback/callback.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { MustBeLoggedInGuard } from './guards/must-be-logged-in/must-be-logged-in.guard';

const routes: Routes = [  
  {
    path: `home`,
    component: HomeComponent
  },
  {
    path: 'editor',
    component: ArticleEditorComponent,
    canActivate: [MustBeLoggedInGuard]
  },
  {
    path: 'editor/:article',
    component: ArticleEditorComponent,
    canActivate: [MustBeLoggedInGuard]
  },
  {
    path: 'view/:article',
    component: ViewArticleComponent,
    canActivate: [MustBeLoggedInGuard]
  },
  {
    path: 'articles',
    component: ListArticlesComponent,
    canActivate: [MustBeLoggedInGuard]
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [MustBeLoggedInGuard]
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
  exports: [RouterModule],
  providers: [MustBeLoggedInGuard]
})
export class AppRoutingModule { }
