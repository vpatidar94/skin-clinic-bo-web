import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
export interface PeriodicElement {
    AppointmentNo: number;
    FullName: string;
    DoctorName: string;
    Complaint: string;
    Action: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {AppointmentNo: 1, FullName: 'Aman Tomar', DoctorName: 'Dr.Abhilasha Patidar', Complaint: 'Acne', Action: "View Details | Confirm | Delete "},
  {AppointmentNo: 2, FullName: 'Ajay Yadav', DoctorName: 'Dr. Mayur Patidar', Complaint: 'Cold & Fever', Action: "View Details | Confirm | Delete "},
  {AppointmentNo: 3, FullName: 'Lalit', DoctorName: 'Dr. Mayur Patidar', Complaint: 'Fever', Action: "View Details | Confirm | Delete "},
  {AppointmentNo: 4, FullName: 'Ram Kumar', DoctorName: 'Dr. Mayur Patidar', Complaint: 'Headache', Action: "View Details | Confirm | Delete "},
  {AppointmentNo: 5, FullName: 'Aman Tomar', DoctorName: 'Dr.Abhilasha Patidar', Complaint: 'Acne', Action: "View Details | Confirm | Delete "},
  {AppointmentNo: 6, FullName: 'Sonam Sharma', DoctorName: 'Dr. Mayur Patidar', Complaint: 'Fever', Action: "View Details | Confirm | Delete "},
  {AppointmentNo: 7, FullName: 'Rakesh Mishra', DoctorName: 'Dr.Abhilasha Patidar', Complaint: 'Cold & Fever', Action: "View Details | Confirm | Delete "},
  {AppointmentNo: 8, FullName: 'Sonam Sharma', DoctorName: 'Dr.Abhilasha Patidar', Complaint: 'Acne', Action: "View Details | Confirm | Delete "},
  {AppointmentNo: 9, FullName: 'Vaibhav', DoctorName: 'Dr. Mayur Patidar', Complaint: 'Fever', Action: "View Details | Confirm | Delete "},
  {AppointmentNo: 10, FullName: 'Aman Tomar', DoctorName: 'Dr. Mayur Patidar', Complaint: 'Cold & Fever', Action: "View Details | Confirm | Delete "},
  {AppointmentNo: 11, FullName: 'Sonam Sharma', DoctorName: 'Dr.Abhilasha Patidar', Complaint: 'Acne', Action: "View Details | Confirm | Delete "},
  {AppointmentNo: 12, FullName: 'Aman Tomar', DoctorName: 'Dr.Abhilasha Patidar', Complaint: 'Fever', Action: "View Details | Confirm | Delete "},
  {AppointmentNo: 13, FullName: 'Aman Tomar', DoctorName: 'Dr. Mayur Patidar', Complaint: 'Acne', Action: "View Details | Confirm | Delete "},
  {AppointmentNo: 14, FullName: 'Ajay Yadav', DoctorName: 'Dr.Abhilasha Patidar', Complaint: 'Fever', Action: "View Details | Confirm | Delete "},
  {AppointmentNo: 15, FullName: 'Aman Tomar', DoctorName: 'Dr.Abhilasha Patidar', Complaint: 'Cold & Fever', Action: "View Details | Confirm | Delete "},
  {AppointmentNo: 16, FullName: 'Sonam Sharma', DoctorName: 'Dr. Mayur Patidar', Complaint: 'Fever', Action: "View Details | Confirm | Delete "},
  {AppointmentNo: 17, FullName: 'Aman Tomar', DoctorName: 'Dr.Abhilasha Patidar', Complaint: 'Cold & Fever', Action: "View Details | Confirm | Delete "},
  {AppointmentNo: 18, FullName: 'Sonam Sharma', DoctorName: 'Dr. Mayur Patidar', Complaint: 'Fever', Action: "View Details | Confirm | Delete "},
  {AppointmentNo: 19, FullName: 'Aman Tomar', DoctorName: 'Dr. Mayur Patidar', Complaint: 'Acne', Action: "View Details | Confirm | Delete "},
  {AppointmentNo: 20, FullName: 'Ajay Yadav', DoctorName: 'Dr.Abhilasha Patidar', Complaint: 'Cold & Fever', Action: "View Details | Confirm | Delete "},
]
  


@Component({
  selector: 'app-testuser.component',
  styleUrls: ['testuser.component.css'],
  templateUrl: 'testuser.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatCardModule],
})
export class TestUserComponent implements AfterViewInit {
  displayedColumns: string[] = ['AppointmentNo', 'FullName', 'DoctorName', 'Complaint', 'Action'];
//   dataSource: MatTableDataSource<UserData>;
dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

//   constructor() {
//     // Create 100 users
//     const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

//     // Assign the data to the data source for the table to render
//     this.dataSource = new MatTableDataSource(users);
//   }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name =
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
//     ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
//     '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
//   };
// }
