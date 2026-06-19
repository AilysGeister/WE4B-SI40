import {Component, OnInit} from '@angular/core';
import {PersonalityService} from "./personality.service";
import {Person} from "../../models/person.model";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Film} from "../../models/film.model";

@Component({
  selector: 'app-personality',
  templateUrl: './personality.component.html',
  styleUrls: ['./personality.component.css']
})
export class PersonalityComponent implements OnInit {

  personality: Person = new Person();
  BASE_URL = "http://localhost:8000/resources/images/profil_pictures/";

  constructor(
    private personalityService: PersonalityService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.personalityService.getById(id).subscribe({
          next: (data: Person) => {
            this.personality = data;
          },
          error: (err) => {
            this.router.navigate(['/']);
          }
        });
      }
    });
  }
}
