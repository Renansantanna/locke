import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../environments/environment';
import { Post } from '../shared/models/post.interface';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';

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
  query;
private search$: Subject<string> = new Subject();

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
        this.subjects.unshift({ id: 0, name: 'Todos' });
        this.selected = 0;
      });
  }

  ngOnInit() {
  this.search$.debounceTime(500).subscribe((queryText) => {
    this.handleSearch(queryText);
  });
  }

  handleSearch(query) {
let url = environment.locke.url + environment.locke.searchByCategories + '/' + this.selected;
if ((<string>query).replace(/\s/g, '').length > 0) {
url += '/' + query;
}
    this.http.get(url)
    .map((response) => response.json())
    .subscribe((response) => {
      console.log(response);
      this.postsList = (<Post[]>response);
    });
  }

search() {
this.search$.next(this.query);
}

}
