import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent {
  constructor(public auth: AngularFireAuth, private router: Router) {}

  login() {
    this.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(({ user }) => {
        if (user) {
          this.router.navigate(['post-a-job']);
        }
      });
  }

  logout() {
    this.auth.signOut();
  }
}
