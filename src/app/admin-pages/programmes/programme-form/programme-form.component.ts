import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Lang} from "../../../../models/lang.model";
import {Room} from "../../../../models/room.model";
import {ActivatedRoute, Router} from "@angular/router";
import {LangService} from "../../langs/lang.service";
import {RoomService} from "../../rooms/room.service";
import {Programme} from "../../../../models/programme.model";
import {ProgrammeService} from "../programme.service";

@Component({
  selector: 'app-programme-form',
  templateUrl: './programme-form.component.html',
  styleUrls: ['./programme-form.component.css']
})
export class ProgrammeFormComponent implements OnInit {

  programmeForm!: FormGroup;
  langs: Lang[] = [];
  rooms: Room[] = [];

  title: string = "";
  isEditMode: boolean = true;
  programmeId: string | null = null

  message: string = "";
  typeResponse: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private langService: LangService,
    private roomService: RoomService,
    private programmService: ProgrammeService,
  ) {}

  ngOnInit(): void {
    this.roomService.getAll().subscribe({
      next: data => {
        this.rooms = data;
      }
    })
    this.langService.getAll().subscribe({
      next: data => {
        this.langs = data;
      }
    })

    this.initForm();

    //Édition ou création:
    this.programmeId = this.route.snapshot.paramMap.get('id');

    if (this.isEditMode && this.programmeId) {
      this.title = "Modifier le programme";
      this.loadProgrammeData(this.programmeId);
    } else {
      this.title = "Créer un programme";
      this.isEditMode = false;
    }
  }

  initForm(): void {
    this.programmeForm = this.formBuilder.group({
      date: ['', [Validators.required]],
      film: [null, Validators.required],
      langId: [null, Validators.required],
      roomId: [null, Validators.required],
    });
  }

  loadProgrammeData(id: string): void {
    this.programmService.getById(id).subscribe({
      next: (programme: Programme) => {
        this.programmeForm.patchValue({
          date: programme.date,
          film: programme.film,
          langId: programme.lang.id,
          roomId: programme.room.id
        });
      },
      error: (err) => {
        this.message = "Erreur lors du chargement de la programation";
        this.typeResponse = "danger";
      }
    });
  }

  onSubmit() {
    if (this.programmeForm.invalid) return;

    const formValue = this.programmeForm.value;
    const formData = new FormData();
    formData.append('date', formValue.date);
    const filmId = formValue.film && typeof formValue.film === 'object' ? formValue.film.id : formValue.film;
    formData.append('film', filmId);
    formData.append('langId', formValue.langId);
    formData.append('roomId', formValue.roomId);

    if (this.isEditMode && this.programmeId) {
      this.programmService.update(this.programmeId, formData).subscribe({
        next: (rep: any) => {
          this.message = rep.message;
          this.typeResponse = "success";
        },
        error: (err: any) => {
          this.message = err.error?.message || 'Une erreur est survenue';
          this.typeResponse = "danger"; }
      });
    } else {
      this.programmService.create(formData).subscribe({
        next: (rep: any) => {
          this.message = rep.message;
          this.typeResponse = "success";
        },
        error: (err: any) => {
          this.message = err.error?.message || 'Une erreur est survenue';
          this.typeResponse = "danger"; }
      });
    }
  }
}
