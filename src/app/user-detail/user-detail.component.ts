import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { addDoc, collection, doc, Firestore, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.class';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAdressComponent } from '../dialog-edit-adress/dialog-edit-adress.component';




@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatIcon, MatButtonModule, MatMenuModule, MatDialogModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  route = inject(ActivatedRoute);
  firestore: Firestore = inject(Firestore);
  readonly dialog = inject(MatDialog);
  routeID: string = '';
  detailedUser: User = new User();


  ngOnInit(): void {
    this.getIdFromRoute();
    this.getUserDetailedInformation(this.routeID);
  }

  async getIdFromRoute() {
    const ID = this.route.snapshot.paramMap.get('id') as string;
    this.routeID = ID;
    this.detailedUser.id = ID;
    await updateDoc(doc(this.firestore, "user", this.routeID), {
      id: this.routeID
    });
    console.log(this.detailedUser);
  }

  async getUserDetailedInformation(docID: string) {
    const docRef = doc(this.firestore, 'user', docID);
    const docSnap = await getDoc(docRef);
    this.detailedUser = docSnap.data() as User;
    console.log(docSnap.data());

  }

  addIdToUser(docID: string) {
    return doc(this.getCollection(), docID, 'id')
  }

  getUser(docID: string) {
    return doc(this.getCollection(), docID)
  }

  getCollection() {
    return collection(this.firestore, 'user');
  }

  openEditPersonalInformationDialog() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.detailedUser);
  }

  openEditAdressInformationDialog() {
    const dialog = this.dialog.open(DialogEditAdressComponent);
    dialog.componentInstance.user = new User(this.detailedUser);
  }

}
