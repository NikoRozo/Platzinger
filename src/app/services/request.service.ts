import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private angularFireDatabase: AngularFireDatabase) { }

  createRequest(request) {
    const cleanEmail = request.receiver_email.replace('.', ',').replace('.', ',');
    console.log(cleanEmail);
    return this.angularFireDatabase.object('request/' + cleanEmail + '/' + request.sender).set(request);
  }

  getRequestStatus(request, status){
    const cleanEmail = request.receiver_email.replace('.', ',').replace('.', ',');
    return this.angularFireDatabase.object('request/' + cleanEmail + '/' + request.sender + '/status').set(status);
  }

  getRequestsForEmail(email){
    const cleanEmail = email.replace('.', ',').replace('.', ',');
    return this.angularFireDatabase.list('request/' + cleanEmail);
  }
}
