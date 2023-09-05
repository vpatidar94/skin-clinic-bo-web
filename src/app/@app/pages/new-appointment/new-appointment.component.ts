import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GENDER_LIST } from '../../const/gender.consr';
import { SHIFT_LIST } from 'aayam-clinic-core';

@Component({
    selector: 'app-new-appointment',
    templateUrl: './new-appointment.component.html',
    styleUrls: ['./new-appointment.component.scss']
  })

  export class NewAppointmentComponent implements OnInit{
    genderList = GENDER_LIST;
    shiftList = SHIFT_LIST;
    dob!: string; 
    age: number | null=null; 

  calculateAge() {
    if (this.dob) {
      const dobDate = new Date(this.dob);
      const today = new Date();
      const ageDiff = today.getFullYear() - dobDate.getFullYear();

      // Check if the birthday has already occurred this year
      if (
        today.getMonth() < dobDate.getMonth() ||
        (today.getMonth() === dobDate.getMonth() && today.getDate() < dobDate.getDate())
      ) {
        this.age = ageDiff - 1; // Subtract 1 if birthday hasn't occurred yet this year
      } else {
        this.age = ageDiff; // Birthday has occurred this year
      }
    } 
    else {
      this.age = null; // Reset the age if DOB is not provided
    }
  }
     /* ************************************ Constructors ************************************ */
     constructor() {
    }

    /* ************************************ Public Methods ************************************ */
    public ngOnInit(): void {
        this._init();
    }

     /* ************************************ Private Methods ************************************ */
     private _init(): void {
        console.log("aayam")
    }
  }