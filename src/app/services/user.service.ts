import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private angularFireDatabase: AngularFireDatabase) {}

  getUsers() {
    return this.angularFireDatabase.list('/users');
  }

  getUserById(uid) {
    return this.angularFireDatabase.object('/users/' + uid);
  }

  createUser(user) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }

  editUser(user) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }

  setAvatar(avatar, uid){
    return this.angularFireDatabase.object('/users/' + uid + '/avatar').set(avatar);
  }

  addFriend(uid, friendId){
    this.angularFireDatabase.object('/users/' + uid + '/friends/' + friendId).set(friendId);
    return this.angularFireDatabase.object('/users/' + friendId + '/friends/' + uid).set(uid);
  }
}
