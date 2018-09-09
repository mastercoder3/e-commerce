import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from './../api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name: string='';
  email: string='';
  contact: string='';
  err;
  image: string='./../../assets/images/user.png';

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    
  }


}
