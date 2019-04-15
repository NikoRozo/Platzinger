import { RequestComponent } from './modals/request/request.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { RequestService } from './services/request.service';
import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'platzinger';
  user: User;
  requests: any[] = [];
  mailsShown: any[] = [];
  constructor(public router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private requestService: RequestService,
              private dialogService: DialogService) {
    this.authenticationService.getStatus().subscribe((session) => {
      this.userService.getUserById(session.uid).valueChanges().subscribe((user: User) => {
        this.user = user;

        this.requestService.getRequestsForEmail(this.user.email).valueChanges().subscribe((request: any) => {
          this.requests = request;
          this.requests = this.requests.filter( (r) => {
            return r.status !== 'accepted' && r.status !== 'rejected';
          });
          this.requests.forEach( (r) => {
            if (this.mailsShown.indexOf(r.sender) === -1) {
              this.mailsShown.push((r.sender));
              this.dialogService.addDialog(RequestComponent, {scope: this, currentRequest: r});
            }
          });
        }, (error) => {
          console.log(error);
        });
      }, (error) => {
        console.log(error);
      });
    });
  }
}
