import { Component, OnInit, HostListener } from '@angular/core';
import {PaymentService} from './../payment.service';
import {environment} from './../../../environments/environment';
import * as myGlobal from './../../global';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {

  handler: any;
  amount: number;

  constructor(private pay: PaymentService, private http: Http, private router: Router, private route: ActivatedRoute) {
    
   }

 

  ngOnInit() {

    this.route.params.subscribe(detials =>{
      this.amount=detials.price*100;
    });

    this.handler = myGlobal.StripeCheckout.configure({
      key: environment.stripeKey,
      image: 'https://firebasestorage.googleapis.com/v0/b/chatapp-5d576.appspot.com/o/hezvad8c32q?alt=media&token=ab155a77-9d6e-4ae8-8917-b50711c6bdf6',
      locale: 'auto',
      token: token =>{
       this.simpleHttp(this.amount, token).subscribe(res=>{
         if(res.status === 200)
         {
           this.pay.processPayment(token, this.amount);
         }
       })
      }
    });
  }

  simpleHttp(amount, token){
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: myHeaders });

    //callrequest
    return this.http.post('http://localhost:3000/payments', {
     amount: this.amount.toString(),
     token: token
    }, options);

  }

  handlePayment(){
    this.handler.open({
      name: 'FireStarter',
      description: 'Deposit Funds to Account',
      amount: this.amount
    });
  }

  @HostListener('window:popstate')

  onPopState(){
    this.handler.close();
  }

}
