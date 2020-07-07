import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logindetails = {
    email : '',
    password : ''
  };
  errormsg = false;
  errorname = "Invalid email or password"

  constructor(private http : HttpClient,
              private router : Router,
              private cookieService : CookieService) { }

  ngOnInit(): void {
  }
  //login with authentication
  public loginUser(){
    this.http.get('http://localhost:3000/login/',{ params: this.logindetails })
    .subscribe(
      (res) => {
          if(res[0]){
            this.cookieService.set('userid' , res[0]._id);
            this.cookieService.set('username' , res[0].firstname);
            this.router.navigate(['/home']);
          }else{
            this.errormsg = true;
          }
      }
    );
  }


}
