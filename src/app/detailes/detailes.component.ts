import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {map} from 'rxjs/operators'
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-detailes',
  templateUrl: './detailes.component.html',
  styleUrls: ['./detailes.component.css']
})
export class DetailesComponent implements OnInit {

  id;
  details;
  detail: AngularFirestoreDocument<any>;
  user;

  By;
  Name: AngularFirestoreDocument<any>;
  constructor(private route: ActivatedRoute, private router: Router, private afs: AngularFirestore, private api:ApiService) { }

  ngOnInit() {

    this.route.params.subscribe(detials =>{
      this.id=detials.id;
    });

    this.details = this.api.getOrderData(this.id);

    this.detail = this.afs.doc<any>('orders/'+this.id);
    this.detail.valueChanges()
      .subscribe(data =>{
       this.details = data;
       this.user = this.details.clientId;
          this.Name = this.afs.doc<any>('clients/'+this.user);
        this.Name.valueChanges()
          .subscribe(data=>{
            this.By = data;
            console.log(this.By);
          });
      });

      
    
    
      
  }





}
