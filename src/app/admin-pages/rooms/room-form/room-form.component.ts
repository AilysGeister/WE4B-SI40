import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../room.service";
import {Lang} from "../../../../models/lang.model";
import {Room} from "../../../../models/room.model";

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css']
})
export class RoomFormComponent implements OnInit {

  roomForm!: FormGroup;

  title: string = "";
  isEditMode: boolean = true;
  langId: string | null = null

  message: string = "";
  typeResponse: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private roomService: RoomService,
  ) { }

  ngOnInit(): void {
    this.initForm();

    //Édition ou création:
    this.langId = this.route.snapshot.paramMap.get('id');

    if (this.isEditMode && this.langId) {
      this.title = "Modifier la salle";
      this.loadRoomData(this.langId);
    } else {
      this.title = "Créer une salle";
      this.isEditMode = false;
    }
  }

  initForm(): void {
    this.roomForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      firstClassSeats: ['', [Validators.required, Validators.min(0)]],
      secondClassSeats: ['', [Validators.required, Validators.min(0)]],
    });
  }

  loadRoomData(id: string): void {
    this.roomService.getById(id).subscribe({
      next: (room: Room) => {
        this.roomForm.patchValue({
          name: room.name,
          firstClassSeats: room.firstClassSeats,
          secondClassSeats: room.secondClassSeats,
        });
      },
      error: (err) => {
        this.message = "Erreur lors du chargement de la salle";
        this.typeResponse = "danger";
      }
    });
  }

  onSubmit() {
    if (this.roomForm.invalid) return;

    const formValue = this.roomForm.value;
    const formData = new FormData();
    formData.append('name', formValue.name);
    formData.append('firstClassSeats', formValue.firstClassSeats);
    formData.append('secondClassSeats', formValue.secondClassSeats);

    if (this.isEditMode && this.langId) {
      this.roomService.update(this.langId, formData).subscribe({
        next: (rep: any) => {
          this.message = rep.message;
          this.typeResponse = "success";
        },
        error: (err: any) => {
          this.message = err.error?.message || 'Une erreur est survenue';
          this.typeResponse = "danger"; }
      });
    } else {
      this.roomService.create(formData).subscribe({
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
