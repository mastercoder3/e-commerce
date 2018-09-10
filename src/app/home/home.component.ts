import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './../api.service';

export interface Product{
  name: string,
  quantity: number,
  price: number
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  product: Observable<Product[]>;
  err;
  dref: AngularFirestoreDocument;
  products: AngularFirestoreCollection<Product>;
  order={
    id: '',
    product: '',
    quantity: Number,
    price: Number,
    clientid: ''
  };

  constructor(private afs: AngularFirestore, private api: ApiService) { 
    this.products = this.afs.collection<Product>('product');
    this.product = this.products.snapshotChanges().pipe(
      map(actions=> actions.map( a => {
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  ngOnInit() {
  }

  add(i){
    console.log(i);
    console.log(this.product.subscribe(data => {
      return data;
    }));
  }

  trackByIndex(index: number, prod: any): any {
    return index;
  }

}
