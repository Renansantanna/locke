import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Post } from '../shared/models/post.interface';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {

  public editor;
  title;
  subjects;
  email = "aaa@bbb.com";
  selected;

  public editorContent = ``;
  public editorOptions = {
    placeholder: "Crie..."
  };

  constructor(private http: Http) { }

  onEditorBlured(quill) {
    console.log('editor blur!', quill);
  }

  onEditorFocused(quill) {
    console.log('editor focus!', quill);
  }

  onEditorCreated(quill) {
    this.editor = quill;
    console.log('quill is ready! this is current quill instance object', quill);
  }

  onContentChanged({ quill, html, text }) {
    console.log('quill content is changed!', quill, html, text);
  }

  ngOnInit() {
    this.http.get(environment.locke.url + environment.locke.categories)
      .map((response) => response.json())
      .subscribe((response) => {
        console.log(response);
        this.subjects = response;
        this.selected = 0;
      });
  }

  sendPost() {
    console.log(this.selected)
    const post: Post = {
      title: this.title,
      subject: this.subjects[this.selected].id,
      subjectValue: this.subjects[this.selected].name,
      content: this.editorContent,
      email: this.email
    }
    this.http.post(environment.locke.url + environment.locke.sendpost, post)
      .subscribe((response) => {
        console.log(response);
      });
  }

}
