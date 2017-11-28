import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Post } from '../shared/models/post.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css']
})
export class ViewArticleComponent implements OnInit {

  activatedRouteSubscription;
  postId;
  content = '';
  public editorOptions = {
    placeholder: "Crie...",
    theme: 'snow',
    modules: {
      toolbar: false
    },
    readOnly: true
  };


  constructor(private screenTitle: Title, private domSanitizer: DomSanitizer, private activatedRoute: ActivatedRoute, private router: Router, private http: Http) {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe((params: Params) => {

      this.postId = params['article'];

      this.activatedRouteSubscription = this.http.get(environment.locke.url + environment.locke.getOne + this.postId)
        .map((response) => response.json())
        .subscribe((response) => {
          console.log(response);
          this.content = (<Post>response[0]).content;

          this.screenTitle.setTitle( (<Post>response[0]).title);
        })
    });
  }

  ngOnInit() {
  }

}
