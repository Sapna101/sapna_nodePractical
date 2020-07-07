import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  HobbiesList : any = [];
  udata : string = '';
  userdetails = {
    firstname : '',
    lastname : '',
    email : '',
    password : '',
    username : '',
    gender : '',
    country : '',
    city : '',
    hobbies : []
  }

  constructor(public http: HttpClient,
              private router: Router  ) { }

  ngOnInit(): void {
    //get hobbies list
    this.http.get('http://localhost:3000/hobbies').subscribe(res => {
      this.HobbiesList = res;
    })
  }
  //create user 
  public registerUser(){
    this.http.post('http://localhost:3000/register/', this.userdetails)
    .subscribe(
      (res) => {
        this.router.navigate(['/login']);
      }
    );
  }

}
