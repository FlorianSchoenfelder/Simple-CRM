import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { collection, doc, Firestore, getDoc, onSnapshot } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import {MatCardModule, MatCardTitle} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.class';
import { UserInterface } from '../interfaces/userInterface';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  route = inject(ActivatedRoute);
  firestore: Firestore = inject(Firestore);
  routeID:string = '';
  detailedUser: User = new User();


  ngOnInit(): void {
    
    const ID = this.route.snapshot.paramMap.get('id') as string;
    this.routeID = ID;
    console.log(this.routeID);
    // let user = this.getUser(this.routeID);
    // this.detailedUser = user.data()
    //  console.log(user);
    // this.getAll(this.routeID);
    this.try(this.routeID);

  }

  async try(docID:string) {
    const docRef = doc(this.firestore, 'user', docID);
    const docSnap = await getDoc(docRef);
    // this.detailedUser = docSnap.data();
    console.log(docSnap.data());
    
  }

  getAll(docId:string) {
    return onSnapshot(doc(this.firestore, "user", docId), (id: any) => {
      // console.log(" Game update: ", id.data());
      this.detailedUser = id.data();
      console.log(this.detailedUser);
      
    
    });
  }

  getUser(docID:string) {
    return doc(this.getCollection(), docID)
  }

  getCollection() {
    return collection(this.firestore, 'user');
  }

}
