import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditAdressComponent } from './dialog-edit-adress.component';
import { FirebaseApp, FirebaseAppModule, initializeApp } from '@angular/fire/app';
import { Firestore } from '@angular/fire/firestore/firebase';
import { FirestoreModule } from '@angular/fire/firestore';

describe('DialogEditAdressComponent', () => {
  let component: DialogEditAdressComponent;
  let fixture: ComponentFixture<DialogEditAdressComponent>;

  beforeEach(async () => {
    const firebaseConfig = {
      projectId:"simple-crm-f51b8",
      appId:"1:684707678179:web:a66080c04a8227de5342d6",
      storageBucket:"simple-crm-f51b8.appspot.com",
      apiKey:"AIzaSyDaf1nujBlmlxFtHqRrl64HSC-hkzpwyhE",
      authDomain:"simple-crm-f51b8.firebaseapp.com",
      messagingSenderId:"684707678179"
    };
    await initializeApp(firebaseConfig);
    await TestBed.configureTestingModule({
      imports: [DialogEditAdressComponent, FirestoreModule, FirebaseAppModule],
      // providers: [Firestore],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditAdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
