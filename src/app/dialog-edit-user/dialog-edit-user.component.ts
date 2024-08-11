import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { User } from '../models/user.class';
import { ActivatedRoute } from '@angular/router';
import { collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [CommonModule, MatProgressBar, MatDialogModule, FormsModule, MatFormField, MatLabel, MatIcon, MatInput, MatDialogActions,
     MatDialogClose, MatIconModule, MatButtonModule, MatDatepickerModule, MatCalendar, MatNativeDateModule, MatIconModule],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {
  readonly dialog = inject(MatDialog);
  firestore: Firestore = inject(Firestore);
  route = inject(ActivatedRoute);
  routeID: string = '';
  user: User = new User();
  loading: boolean = false;
  birthDate: Date = new Date();

  async saveUser() {
    this.loading = true;
    await updateDoc(this.getUser(this.user.id), this.user.toJson())
    this.loading = false;
    this.dialog.closeAll();
    window.location.reload();
  }

  getCollection() {
    return collection(this.firestore, 'user');
  }

  getUser(docID: string) {
    return doc(this.getCollection(), docID)
  }
}
