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
  postsList: Post[];
  postsListHack: Post[];
  subjects: any[];
  selected;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: Http) {

    this.activatedRouteSubscription = this.http.get(environment.locke.url + environment.locke.getAll)
      .map((response) => response.json())
      .subscribe((response) => {
        console.log(response);
        this.postsList = (<Post[]>response);
        this.postsListHack = this.postsList;
      });
    this.http.get(environment.locke.url + environment.locke.categories)
      .map((response) => response.json())
      .subscribe((response) => {
        console.log(response);
        this.subjects = response;
        this.subjects.unshift({ name: 'Selecione' });
        this.selected = 0;
      });
  }

  ngOnInit() {
  }

  search(index) {
    this.http.get(environment.locke.url + environment.locke.searchByCategories + '/' + this.selected)
    .map((response) => response.json())
    .subscribe((response) => {
      console.log(response);
      this.postsList = (<Post[]>response);
    });
  }

}
