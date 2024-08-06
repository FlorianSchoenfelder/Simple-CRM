import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync(),
     provideAnimationsAsync(), 
     provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-f51b8","appId":"1:684707678179:web:a66080c04a8227de5342d6","storageBucket":"simple-crm-f51b8.appspot.com","apiKey":"AIzaSyDaf1nujBlmlxFtHqRrl64HSC-hkzpwyhE","authDomain":"simple-crm-f51b8.firebaseapp.com","messagingSenderId":"684707678179"})),
      provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())]
};
