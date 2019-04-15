import { RequestService } from './../../services/request.service';
import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';

export interface PromptModel {
  scope: any;
  currentRequest: any;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent extends DialogComponent<PromptModel, any> implements PromptModel {
  scope: any;
  currentRequest: any;
  shouldAdd: string = 'yes';
  constructor(public dialogService: DialogService,
              private userService: UserService,
              private requestService: RequestService) {
    super(dialogService);
  }


  accept(){
    let status = 'pending';
    console.log(this.shouldAdd);
    if (this.shouldAdd === 'yes') {
      status = 'accepted';
    } else if (this.shouldAdd === 'no') {
      status = 'rejected';
    }
    console.log(status);
    this.requestService.getRequestStatus(this.currentRequest, status).then((data) =>{
      console.log(data);
      if (status === 'accepted') {
        this.userService.addFriend(this.scope.user.uid, this.currentRequest.sender).then(() => {
          alert('Solicitud Aceptada');
        }).catch( (error) => {
          console.log(error);
        });
      } else if (status === 'rejected'){
        alert('Solicitud Rechazada');
      } else {
        alert('Solicitud Puespuesta');
      }
    }).catch( (error) => {
      console.log(error);
    });
  }
}
