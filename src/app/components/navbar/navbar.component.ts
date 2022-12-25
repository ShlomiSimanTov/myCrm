import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  email!: string;
  constructor(private router: Router, private userService: UsersService) { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem('email') as string;
  }

  logout() {
    this.userService
      .logout()
      .then(() => {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('email');
        this.router.navigateByUrl('login');
      })
      .catch((err) => console.log(err));
  }
}

