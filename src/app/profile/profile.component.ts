import { AuthenticationService } from './../services/authentication.service';
import { UserService } from './../services/user.service';
import { User } from './../interfaces/user';
import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture: any;
  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private fireStorege: AngularFireStorage) {
    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit() {
  }

  saveSettings() {
    if (this.croppedImage) {
      const currentPictureId = Date.now();
      const pictures = this.fireStorege.ref('pictures/' + currentPictureId + '.jpg').putString(this.croppedImage, 'data_url');
      pictures.then(() => {
        this.picture = this.fireStorege.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
        this.picture.subscribe((img) => {
          this.userService.setAvatar(img, this.user.uid).then(() => {
            alert('Avatar Subido Correctamente');
          }).catch((error) => {
            alert('Hubo un error al Intentar subir la Imagen');
            console.log(error);
          });
        }).catch((error) => {
        console.log(error);
      });
      }).catch((error) => {
        console.log(error);
      });
    } else {
      this.userService.editUser(this.user).then(() => {
        alert('Cambios Guardados');
      }).catch((error) => {
        alert('Ocurrio un error');
        console.log(error);
      });
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
