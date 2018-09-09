import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthService} from './../auth.service';
import {ApiService} from './../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string='';
  password: string='';
  err='';

  constructor(private afAuth: AuthService, private afs: ApiService, private router: Router) { }

  ngOnInit() {
  } 

  login(){
    this.afAuth.login(this.email,this.password)
      .then(res => {
        this.afs.getCustomer(res.user.uid).subscribe(data => {
          if(data){
            
            localStorage.setItem('uid', res.user.uid);
            this.router.navigate(['/dashboard']);
          }
          else
            console.log('User Data Not Found');
        })
      }, err=>{
          this.err = err;
          console.log(err);
      })
  }
}

