import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  loginWithEmail(email: string, passaword: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, passaword);
  }

  registerWithEmail(email: string, passaword: string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, passaword);
  }

  getStatus(){
    return this.angularFireAuth.authState;
  }

  logout() {
    return this.angularFireAuth.auth.signOut();
  }
}
