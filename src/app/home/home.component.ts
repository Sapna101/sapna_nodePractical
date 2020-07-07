import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userList : any = [];
  currentUser;
  pendingfriendList : any = [];
  currentuserdata ;
  filtereddata;

  constructor(private http : HttpClient,
              private router : Router,
              private cookieService : CookieService) { }

  ngOnInit(): void {
    this.getuserList();
    this.currentUser = this.cookieService.get('userid');
    if(!this.currentUser){
      this.router.navigate(['/login']);
    }
  }
  // get users list
  public getuserList(){
    this.http.get("http://localhost:3000/userlist").subscribe((res)=>{
      this.userList = res;
      // get current user data
      this.currentuserdata = this.userList.filter((user)=>{
        return user._id == this.currentUser;
      });
      this.currentuserdata = this.currentuserdata[0];
      this.userList = this.userList.filter((user)=>{
        return user._id != this.currentUser;
      });
      this.filtereddata = [];
      //filter users which are not friends and not requested
      this.userList.map(user => {
        if(this.currentuserdata.friends.includes(user._id) || this.currentuserdata.pendingrequests.includes(user._id)){
        }
        else{
          this.filtereddata.push(user);
        }
      });
    });
  }
  //send friend request to user
  public sendRequest(id){
    this.http.post("http://localhost:3000/sendrequest",{ requestid : id , id : this.currentUser}).subscribe((res)=>{
      this.getuserList();
    });
  }
}
