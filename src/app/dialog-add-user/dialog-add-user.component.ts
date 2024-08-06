import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCalendar, MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../models/user.class';
import { addDoc, collection, doc, Firestore } from '@angular/fire/firestore';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../user/user.component';


@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatCalendar,
    MatNativeDateModule,
    MatProgressBarModule,
    CommonModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  readonly dialog = inject(MatDialog);
  firestore: Firestore = inject(Firestore);

  user = new User();
  birthDate: Date = new Date();
  loading:boolean = false;

  valueFirstName = '';
  valueLastName = '';
  valueStreetHouse = '';
  valueZipCode = '';
  valueCity = '';

  constructor() {}

  async saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    console.log('User', this.user);
    await addDoc(this.getNotesRef(), this.user.toJson()).catch((error) => {
      console.log(error);
    });
    this.loading = false;
    this.dialog.closeAll();
  }

  getNotesRef() {
    return collection(this.firestore, 'user');
  }
}
