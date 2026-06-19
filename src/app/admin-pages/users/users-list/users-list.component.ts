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

  }
}
