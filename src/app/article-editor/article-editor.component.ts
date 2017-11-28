import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Post } from '../shared/models/post.interface';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {

  public editor;
  title;
  subjects;
  uid = "aaabbbcom";
  selected = -1;

  public editorContent = ``;
  public editorOptions = {
    placeholder: "Crie...",
    theme:  'snow'
  };

  activatedRouteSubscription;
  postId;
  isUpdate = false;
  constructor(private activatedRoute: ActivatedRoute, private http: Http, private router: Router) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.uid = user.user_id;
      if (!this.uid) {
        this.router.navigate(['/home']);
      }
    }
  }

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

        this.activatedRouteSubscription = this.activatedRoute.params.subscribe((params: Params) => {

          this.postId = params['article'];
          if (this.postId) {
            this.activatedRouteSubscription = this.http.get(environment.locke.url + environment.locke.getMyPosts + '/' + this.uid + '/post/' + this.postId)
              .map((response) => response.json())
              .subscribe((response) => {
                console.log(response);
                if (response.length > 0) {
                  this.title = (<Post>response[0]).title;
                  this.editorContent = (<Post>response[0]).content;
                  this.selected = this.subjects.findIndex(i => i.id === ((<Post>response[0]).subject));
                  this.isUpdate = true;
                } else {
                  this.router.navigate(['/home']);
                }
              });
          }
        });
      });
  }

  sendPost() {
    console.log(this.selected);
    const post: Post = {
      title: this.title,
      subject: this.subjects[this.selected].id,
      subjectValue: this.subjects[this.selected].name,
      content: this.editorContent,
      uid: this.uid,
      color: this.subjects[this.selected].color
    };

    if (this.isUpdate) {
      this.http.post(environment.locke.url + environment.locke.updatePost + this.postId, post)
        .subscribe((response) => {
          console.log(response);
        });
    } else {
      this.http.post(environment.locke.url + environment.locke.sendpost, post)
        .subscribe((response) => {
          console.log(response);
        });
    }
  }

}
