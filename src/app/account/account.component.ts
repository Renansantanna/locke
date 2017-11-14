import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../environments/environment';
import { Post } from '../shared/models/post.interface';
import { Http } from '@angular/http';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  activatedRouteSubscription;
  postsList;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: Http, private auth0: AuthService) {
    let uid = JSON.parse(localStorage.getItem('user')).user_id;
    if (uid) {
      this.activatedRouteSubscription = this.http.get(environment.locke.url + environment.locke.getMyPosts + '/' + uid)
        .map((response) => response.json())
        .subscribe((response) => {
          console.log(response);
          this.postsList = (<Post[]>response);
        });
    } else {
      localStorage.clear();
      // Go back to the home route
      this.router.navigate(['/home']);
     // auth0.logout();
    }
  }

  ngOnInit() {
  }
}
