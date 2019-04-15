import { Router } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';
import { UserService } from './../services/user.service';
import { User } from './../interfaces/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  friends: User[];
  query: string = '';
  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private router: Router) {
    userService.getUsers().valueChanges().subscribe( (data: User[]) => {
      this.friends = data;
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout().then(() => {
      alert('Sesión Cerrada');
      this.router.navigate(['login']);
    }).catch((error) => {
      console.log(error);
    });
  }

}
