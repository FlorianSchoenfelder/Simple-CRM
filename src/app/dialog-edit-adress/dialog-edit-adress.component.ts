import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, inject } from '@angular/core';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogModule } from '@angular/material/dialog';
import { User } from '../models/user.class';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { ActivatedRoute } from '@angular/router';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-edit-adress',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatProgressBar, FormsModule,
    MatFormField, MatLabel, MatIcon, MatInput, MatDialogActions,
    MatDialogClose, MatIconModule, MatButtonModule],
  templateUrl: './dialog-edit-adress.component.html',
  styleUrl: './dialog-edit-adress.component.scss'
})
export class DialogEditAdressComponent {
  readonly dialog = inject(MatDialog);
  firestore: Firestore = inject(Firestore);
  route = inject(ActivatedRoute);
  routeID: string = '';
  user: User = new User();
  loading: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log(this.user.id);

  }

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
