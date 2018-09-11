import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from './../api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import {AngularFirestore} from '@angular/fire/firestore';

export interface Order{
  clientId: string,
  customerId: string,
  name: string,
  price: number,
  quantity: number

}

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  order: Observable<Order[]>;
  orderred: AngularFirestoreCollection<Order>;

  constructor(private router: Router, private api: ApiService, private afs: AngularFirestore) {
    this.orderred = this.afs.collection<Order>('orders', ref=> ref.where('customerId', '==', localStorage.getItem('uid')));
    this.order = this.orderred.snapshotChanges().pipe(map(actions =>actions.map(a=>{
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return {id, ...data};
    })));
   }

  ngOnInit() {
  }

  clicked(i, order){
    console.log(order);
    let detail ={
      id: order.id,
      pby: order.clientId,
      name: order.name,
      quantity: order.quantity,
      price: order.price
    }

    this.router.navigate(['dashboard/details', {id: detail.id}]);

  }

  trackByIndex(index: number, order: any): any {
    return index;
  }

  

}
