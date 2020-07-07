import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.scss']
})
export class PendingRequestComponent implements OnInit {
  userList : any = [];
  currentUser;
  pendingfriendList : any = [];
  currentuserdata;

  constructor(private http : HttpClient,
              private router : Router,
              private cookieService : CookieService) { }

  ngOnInit(): void {
    this.getrequestList();
    this.currentUser = this.cookieService.get('userid');
    if(!this.currentUser){
      this.router.navigate(['/login']);
    }
  }
  //get list of users which have sent friend request
  public getrequestList(){
    this.http.get("http://localhost:3000/userlist").subscribe((res)=>{
      this.userList = res;
      this.currentuserdata = this.userList.filter(user => {
        return user._id == this.currentUser;
      });
      this.currentuserdata = this.currentuserdata[0];

      this.userList.map((user)=>{
        if(this.currentuserdata.pendingrequests.includes(user._id)){
          this.pendingfriendList.push(user);
        }
      });
    });
  }
  // accept friend request
  public acceptUser(id){
    const index = this.currentuserdata.pendingrequests.indexOf(id);
    if (index > -1) {
      this.currentuserdata.pendingrequests.splice(index, 1);
    }
    this.currentuserdata.friends.push(id);
    this.http.post("http://localhost:3000/updateFriendList",{ data : this.currentuserdata , id : id }).subscribe( res => {
      let fdata = this.pendingfriendList.filter((friend)=>{
        return friend._id != id;
      });
      this.pendingfriendList = fdata;
    });
  }
  // decline friend request
  public declineUser(id){
    const index = this.currentuserdata.pendingrequests.indexOf(id);
    if (index > -1) {
      this.currentuserdata.pendingrequests.splice(index, 1);
    }
    this.http.post("http://localhost:3000/updatependingRequestList",{ data : this.currentuserdata}).subscribe( res => {
      let fdata = this.pendingfriendList.filter((friend)=>{
        return friend._id != id;
      });
      this.pendingfriendList = fdata;
    });
  }

}
