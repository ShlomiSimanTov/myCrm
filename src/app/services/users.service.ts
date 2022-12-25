import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from '@firebase/auth';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private auth: Auth) {}

  login(user: User): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, user.email, user.password);
  }

  loginGoogle(): Promise<UserCredential> {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  register(newUser: User): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this.auth,
      newUser.email,
      newUser.password
    );
  }

  logout() {
    return this.auth.signOut();
  }
}