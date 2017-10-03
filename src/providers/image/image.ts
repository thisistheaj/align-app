import { Injectable } from '@angular/core';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {UUIDProvider} from "../uuid/uuid";
import * as firebase from 'firebase';
import {DatabaseProvider} from "../database/database";

/*
  Generated class for the ImageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ImageProvider {

  private cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    targetHeight: 500,
    targetWidth: 500,
    allowEdit: true
  };

  // private currentUserId: string;

  constructor(public camera: Camera/*, public userProvider: UserProvider*/, public dbPvdr: DatabaseProvider) {
    // this.currentUserId = userProvider.getUserID();
  }

  public uploadImage(image: string): firebase.Promise<any> {
    let imageName = UUIDProvider.generateUUID();
    return this.dbPvdr.uploadFile(`${imageName}.jpg`, image)
      .then(data => data.metadata.downloadURLs[0], err => err);
  }

  public getImage(imageId: string): firebase.Promise<any> {
    return this.dbPvdr.getFile(`${imageId}`)
      .then(data => data, err => err);
  }

  public takePicture(): Promise<any> {
    return this.camera.getPicture(this.cameraOptions)
      .then(data => 'data:image/jpeg;base64,' + data, err => err);
  }

}
