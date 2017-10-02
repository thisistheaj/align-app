import {UUIDProvider} from "../providers/uuid/uuid";

export class User {
  public name: string;
  public email: string;
  public uid: string;
  public bio: string;
  public skills: Array<string>;
  public imageUrl: string = "";
  public matches: any = {};

  constructor(obj: User){
    this.uid = UUIDProvider.generateUUID();
    this.email = obj.email;
    this.name = obj.name;
    this.bio = obj.bio;
    if (obj.matches) {
      this.matches = obj.matches;
    }
  }

}
