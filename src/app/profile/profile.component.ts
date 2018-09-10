import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from './../api.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFirestoreDocument} from '@angular/fire/firestore';
import { AngularFireStorage,  AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  uploadProgress: Observable<number>;
   downloadURL: Observable<any>;
   ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  docRef: AngularFirestoreDocument;
  email: any;
  user;
  err;
  image: string='./../../assets/images/user.png';

  constructor(private router: Router, private api: ApiService, private db: AngularFirestore, private fireStorage: AngularFireStorage) { 
  }

   ngOnInit() {
     this.getData(localStorage.getItem('uid'));
   }

   
  upload(event){
    const id = Math.random().toString(36).substring(2);
    this.ref = this.fireStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          this.image = url;
          this.user.image = url;
          this.update();
        });
      })
    ).subscribe();

  }


  update(){
    this.api.updateCustomer(localStorage.getItem('uid'),this.user)
      .then(res=>{
          console.log('Profile Updated');
      }, err=>{
          console.log('Error!!!!');
      })
  }

  getData(id){
   this.api.getCustomer(id).pipe(map(actions => {

    const data = actions.payload.data() ;
    const id = actions.payload.id;
    return {id, ...actions.payload.data()};

  }))
  .subscribe(resp=>{
    this.user = resp;
  })
 
    }
  


}
