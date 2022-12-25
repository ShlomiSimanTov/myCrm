import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = { email: '', password: '' };

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.userService
      .login(this.user)
      .then((data) => {
        console.log('Success');
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('email', data.user.email as string);
        this.router.navigateByUrl('customers');
      })
      .catch((err) => {
        alert('please cheack your email and password again');
        console.log(err);
      });
  }
  loginWithGoogle() {
    this.userService.loginGoogle().then((data) => {
      console.log('Success');
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('email', data.user.email as string);
      this.router.navigateByUrl('customers');
    });
  }
}