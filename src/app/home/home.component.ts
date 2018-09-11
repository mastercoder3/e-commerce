import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './../api.service';
import {Router} from '@angular/router';

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
    quantity: 0,
    price: 0,
    clientid: ''
  };
  prods={
    quantity: 0
  };

  orders=[];


  eventHandle(index, e){
    console.log(e.target.value);
    console.log(index);
  }

  constructor(private afs: AngularFirestore, private api: ApiService, private router: Router) { 
    
  }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.products = this.afs.collection<Product>('product');
    this.product = this.products.snapshotChanges().pipe(
      map(actions=> actions.map( a => {
        const data = a.payload.doc.data() as Product;
        const did = a.payload.doc.id;
        const selectedQuantity= 0;
        return {did,selectedQuantity, ...data};
      }))
    );
  }

  add(product){
    let prod={
      name:product.name,
      quanity:product.selectedQuantity,
      price:Number(product.price)*Number(product.selectedQuantity),
      clientId:product.id,
      customerId: localStorage.getItem('uid')
    }

    let q = Number(product.quantity);
    let sq = Number(product.selectedQuantity);

    console.log(q);

    if(q>sq){
      this.prods.quantity = q - sq;
    }
    else{
      this.prods.quantity = q - q;
      prod.price = Number(product.price)*q;
    }
    this.orders.push(prod);

    console.log(this.orders);
    this.update(product.did, this.prods);
  }

  update(id,prod){
    this.api.updateProduct(id,prod).then(res=>{
      console.log('Updated');
    });
  }

  checkout(){
    if(this.orders !== null)
    this.orders.forEach(i => {
      this.api.createOrders(i)
      .then(res=>{
        console.log('Added');
      }, err=>{
        console.log(err);
      });
    });

    this.router.navigate(['/dashboard/billing']);
    
 
  }






  trackByIndex(index: number, prod: any): any {
    return index;
  }

}
