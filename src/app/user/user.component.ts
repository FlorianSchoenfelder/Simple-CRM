import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../models/user.class';
import {MatCardModule} from '@angular/material/card';
import { addDoc, collection, doc, DocumentData, Firestore, onSnapshot } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { UserInterface } from '../interfaces/userInterface';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatCardModule, MatIconModule, MatTooltipModule, MatDialogModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  readonly dialog = inject(MatDialog);
  firestore: Firestore = inject(Firestore);


  user = new User();
  loadedUsers: UserInterface[] = [];

  constructor() {}


  ngOnInit(): void {
    onSnapshot(this.getCollection(), (list) => {
      this.loadedUsers = [];
      list.forEach(element => {
        const user: UserInterface = element.data() as UserInterface;
      user.id = element.id;  // Add the ID to the user object
      this.loadedUsers.push(user);
        
      });
      console.log(this.loadedUsers);
    });
  }

  public toJson(obj: any, id: string) {
    return {
      id: id || '',
      firstName: obj.firstName || '',
      lastName: obj.lastName || '',
      birthDate: obj.birthDate || null,
      street: obj.street ||'',
      zipCode: obj.zipCode || null,
      city: obj.city || '',
    }
  }

  getCollection() {
    return collection(this.firestore, 'user');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log('Unable to close'); 
      }
    });
  }
}
