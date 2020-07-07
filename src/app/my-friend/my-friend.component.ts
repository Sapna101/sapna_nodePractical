import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-my-friend',
  templateUrl: './my-friend.component.html',
  styleUrls: ['./my-friend.component.scss']
})
export class MyFriendComponent implements OnInit {
  userList : any = [];
  friendList : any = [];
  currentUser;

  constructor(private http : HttpClient,
              private router : Router,
              private cookieService : CookieService) { }

  ngOnInit(): void {
    this.currentUser = this.cookieService.get('userid');
    if(!this.currentUser){
      this.router.navigate(['/login']);
    }
    //get user list
    this.http.get("http://localhost:3000/userlist").subscribe((res)=>{
      this.userList = res;
      //get users friend list
      let currentuserdata = this.userList.filter(user => {
        return user._id == this.currentUser;
      });
      currentuserdata = currentuserdata[0];
      // filter friends data
      this.userList.map((user)=>{
        if(currentuserdata.friends.includes(user._id)){
          this.friendList.push(user);
        }
      });
    });
  }

}
