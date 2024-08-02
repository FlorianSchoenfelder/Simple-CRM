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
    MatNativeDateModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  readonly dialog = inject(MatDialog);

  user = new User();

  valueFirstName = '';
  valueLastName = '';
  valueStreetHouse = '';
  valueZipCode = '';
  valueCity = '';

  saveUser() {
    console.log('User is', this.user);
    
  }
}
