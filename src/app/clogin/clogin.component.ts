import { Component, OnInit } from '@angular/core';
import {AuthService} from './../auth.service';
import {ApiService} from './../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-clogin',
  templateUrl: './clogin.component.html',
  styleUrls: ['./clogin.component.css']
})
export class CloginComponent implements OnInit {

  email: string='';
  password: string='';
  err='';

  constructor(private afAuth: AuthService, private afs: ApiService, private router: Router) { }

  ngOnInit() {
  } 

  client(){
    this.router.navigate(['/login']);
  }

  login(){
    localStorage.removeItem('uid');
    this.afAuth.login(this.email,this.password)
      .then(res => {
        this.afs.getClient(res.user.uid).subscribe(data => {
          if(data){
            
            localStorage.setItem('uid', res.user.uid);
            this.router.navigate(['/cdashboard']);
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
