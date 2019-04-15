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
  friends: User[];
  friend: User;
  price = 78.354362532632;
  today: any = Date.now();
  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService) {
    /*Recuperar UID por el Parametro de la URL*/
    this.friendId = this.activatedRoute.snapshot.params['uid'];

    console.log(this.friendId);

    this.friends = userService.getFriends();

    this.friend = this.friends.find( (record) => {
      return record.uid == this.friendId;
    } );
    console.log(this.friend);
  }

  ngOnInit() {
  }

}
