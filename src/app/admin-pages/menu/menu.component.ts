import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() currentUser: any;

  isMenuOpen = false;

  constructor() {}

  ngOnInit(): void {
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isModerator(): boolean  {
    return (this.isAdmin() || this.currentUser.getHighestRole() === 'Modérateur');
  }

  isFundManager(): boolean {
    return (this.isAdmin() || this.currentUser.getHighestRole() === 'Gestionnaire');
  }

  isAdmin(): boolean {
    return this.currentUser.getHighestRole() === 'Administrateur';
  }
}
