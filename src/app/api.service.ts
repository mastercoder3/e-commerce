import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private afs: AngularFirestore) { }


  //Create
  createCustomer(uid, data){
    return this.afs.doc('customers/'+uid).set(data);
   }
 
 //READ 
 getCustomer(uid){
   return this.afs.doc('customers/'+uid).snapshotChanges();
 }
 
 //UPDATE 
 updateCustomer(uid, data){
   return this.afs.doc('customers/'+uid).update(data);
 
 }
   
 deleteCustomer(uid){
   return this.afs.doc('customers/'+uid).delete();
 }

//  ::::::::::::::::::::::::: Product::::::::::::::::::::::

updateProduct(id,data){
  return this.afs.doc('product/'+id).update(data);
}

createOrders(data){
  return this.afs.collection('orders').add(data);
}

getOrders(id){
  return this.afs.collection('orders', ref=> ref.where('customerId', '==', id)).snapshotChanges();
}

getOrderData(id){
  return this.afs.doc('orders/'+id).valueChanges();
}

/*
transactions => doc id => information
payments => userid => transactions id
*/


}
