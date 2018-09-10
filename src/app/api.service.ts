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
// :::::::::::::::::::::::::::::::::::::::CLIENT::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 //Client
 createClient(uid, data){
  return this.afs.doc('clients/'+uid).set(data);
 }

 //READ 
 getClient(uid){
  return this.afs.doc('clients/'+uid).snapshotChanges();
}

//UPDATE 
updateClient(uid, data){
  return this.afs.doc('clients/'+uid).update(data);

}

deleteClient(uid){
  return this.afs.doc('clients/'+uid).delete();
}


}
