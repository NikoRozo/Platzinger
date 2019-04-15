import { UserService } from './../services/user.service';
import { User } from './../interfaces/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  friendId: any;
  friend: User;
  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService) {
    /*Recuperar UID por el Parametro de la URL*/
    this.friendId = this.activatedRoute.snapshot.params['uid'];

    console.log(this.friendId);

    userService.getUserById(this.friendId).valueChanges().subscribe((data: User) => {
      this.friend = data;
    }, (error) => {
      console.log(error);
    });
  }
  ngOnInit() {
  }

}
