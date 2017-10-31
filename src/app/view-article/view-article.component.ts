import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Post } from '../shared/models/post.interface';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css']
})
export class ViewArticleComponent implements OnInit {

  activatedRouteSubscription;
  postId;
  content = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: Http) {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe((params: Params) => {

      this.postId = params['article'];

      this.activatedRouteSubscription = this.http.get(environment.locke.url + environment.locke.getOne + this.postId)
      .map((response) => response.json())
      .subscribe((response) => {
        console.log(response);
        this.content = response.post[0].content;
      })
    });
  }

  ngOnInit() {
  }

}
