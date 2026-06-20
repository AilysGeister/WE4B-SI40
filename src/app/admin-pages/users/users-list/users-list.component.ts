import {Component, OnInit} from '@angular/core';
import {User} from "../../../../models/user.model";
import {UsersService} from "../users.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];

  constructor(
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
        this.users.sort((a, b) => a.id - b.id)
      }
    })
  }

  onDelete(id: number) {
    if (id && confirm("Êtes-vous sûr de vouloir supprimer cette utilisateur ? (Cette action est irréversible !)")) {
      this.usersService.delete(id.toString()).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id !== id);
        },
        error: (err) => {
          alert("Une erreur est survenue lors de la suppression.");
        }
      });
    }
  }
}
