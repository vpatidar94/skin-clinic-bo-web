import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
export interface PeriodicElement {
  appNo: number;
  name: string;
  date: string;
  time: string;
  doctor: string;
  action: string;
  showInputFields?: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { appNo: 1, name: 'Rahul Dongre', date: '09/6/2023', time: '12:00-12:10', doctor: "Dr Ramesh Mahajan", action: "add appointment | delete", },
  { appNo: 2, name: 'Abhay Singh', date: '09/6/2023', time: '11:30-11:40', doctor: "Dr Ram Shrivastava", action: "add appointment | delete", },
  { appNo: 3, name: 'Sunny Thakur', date: '12/6/2023', time: '01:00-01:10', doctor: "Dr Mayank Patidar", action: "add appointment | delete", },
  { appNo: 4, name: 'Vishal Pandit', date: '15/6/2023', time: '03:00-03:10', doctor: "Dr Mayur Patidar", action: "add appointment | delete", },

]

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss']
})

export class NewAppointmentComponent implements OnInit {

  showSectionAppointmentList: boolean = false;
  showSectionAppointmentEdit: boolean = false;

  displayedColumns: string[] = ['appNo', 'name', 'date', "time", "doctor", "action"];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /* ************************************ Constructors ************************************ */
  constructor() {
  }

  /* ************************************ Public Methods ************************************ */
  public ngOnInit(): void {
    this._init();
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public addAppointment() {

    this._addEditAppointment();
  }

  public searchTodaysAppointments(): void {
    const filterValue = new Date().toLocaleDateString();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public searchPreviousAppointments(): void {

  }

  public cancel(): void {
    this._init();
  }

  /* ************************************ Private Methods ************************************ */
  private _init(): void {
    this._resetSection();
    this.showSectionAppointmentList = true;
  }
  private _resetSection(): void {
    this.showSectionAppointmentList = false;
    this.showSectionAppointmentEdit = false;
  }
  private _addEditAppointment(): void {
    this._resetSection();
    this.showSectionAppointmentEdit = true;
  }
}