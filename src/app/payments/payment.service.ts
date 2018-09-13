import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  userId: string = localStorage.getItem('uid');

  constructor(private afs: AngularFirestore) { }

  processPayment(token: any, amount){
    const payment = {token , amount}
    this.afs.collection('transactions').add(payment).then(res=> {
      //console.log(localStorage.getItem('uid'));
      this.afs.doc('payments/'+localStorage.getItem('uid')).set({paymentId: res.id}).then(res =>{
        console.log("Payment Added!");
      }, err=>{
        console.log(err);
      })
    }, err=>{
      console.log(err);
    });
    //console.log(idd);
    //return this.afs.doc(`payments/${this.userId}`).collection('payments').add(payment);
  }

}
