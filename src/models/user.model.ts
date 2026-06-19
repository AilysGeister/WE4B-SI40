import {Person} from "./person.model";
import {Comment} from "./comment.model";

export class User {

  public id: number = -1;
  public username: string = "";
  public email: string = "";
  public roles: string[] = ["VISITOR"];
  public password: string = "";
  public person: Person = new Person();
  public basket?: any;
  public visibleComments: Comment[] = [];

  public getHighestRole(): string {
    if (!this.roles || this.roles.length === 0) {
      return 'Utilisateur';
    }

    if (this.roles.includes('ROLE_ADMIN')) return 'Administrateur';
    if (this.roles.includes('ROLE_FUND_MANAGER')) return 'Gestionnaire';
    if (this.roles.includes('ROLE_MODERATOR')) return 'Modérateur';
    if (this.roles.includes('ROLE_USER')) return 'Membre';

    return 'Visiteur';
  }

  public getFullName(): string {
    if (!this.person.firstname && !this.person.lastname) {
      return this.username;
    }
    return this.person.firstname + " " + this.person.lastname;
  }
}
