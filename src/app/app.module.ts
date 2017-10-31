import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { QuillEditorModule } from 'ngx-quill-editor';
import { FormsModule } from '@angular/forms';

import { Ng2BootstrapModule } from 'ngx-bootstrap';
import { ArticleEditorComponent } from './article-editor/article-editor.component';

import { HttpModule } from '@angular/http';
import { ViewArticleComponent } from './view-article/view-article.component';
import { ListArticlesComponent } from './list-articles/list-articles.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleEditorComponent,
    ViewArticleComponent,
    ListArticlesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuillEditorModule,
    FormsModule,
    Ng2BootstrapModule.forRoot(),
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
