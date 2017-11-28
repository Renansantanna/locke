import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../environments/environment';
import { Post } from '../shared/models/post.interface';
import { Http } from '@angular/http';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {

  activatedRouteSubscription;
  postsList;
  
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: Http) {

    this.activatedRouteSubscription = this.http.get(environment.locke.url + environment.locke.getAll)
      .map((response) => response.json())
      .subscribe((response) => {
        console.log(response);
        this.postsList = (<Post[]>response);
      });
  
  }

  ngOnInit() {
  }

}
