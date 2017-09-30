import {UUIDProvider} from "../providers/uuid/uuid";

export class User {
  name: string;
  email: string;
  uid: string;

  constructor(obj: {email:string,name:string}){
    this.uid = UUIDProvider.generateUUID();
    this.email = obj.email;
    this.name = obj.name;
  }

}
