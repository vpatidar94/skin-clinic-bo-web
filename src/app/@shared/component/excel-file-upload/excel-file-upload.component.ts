// import { Component } from '@angular/core';
// import * as XLSX from 'xlsx';

// @Component({
//   selector: 'app-excel-file-upload',
//   templateUrl: './excel-file-upload.component.html',
//   styleUrls: ['./excel-file-upload.component.scss']
// })
// export class ExcelFileUpload {
//   department: string = 'hey';
//   selectedDate: string = '';
//   excelFiles: any[] = []; // Array to store Excel file data
//   showTables: boolean = false; // Flag to control tables visibility
//   showDetails: boolean = false; // Flag to control search input and result visibility
//   searchText: string = ''; // Text to search
//   isTextFound: boolean = false; // Flag to indicate text found
//   currentFileData: any[] = []; // Data of the currently viewed Excel file
//   tableColumns: string[] = []; // Array to store column names

//   constructor() {}

//   onFileChange(event: any): void {
//     // You can keep this function empty since we're adding files on the "Add File" button click.
//   }

//   addFile(fileInput: any): void {
//     if (this.selectedDate) {
//       const files = fileInput.files;
//       if (files) {
//         for (let i = 0; i < files.length; i++) {
//           const file = files[i];
//           this.readExcelFile(file);
//         }
//       }
//     } else {
//       alert('Please select a date before adding files.');
//     }
//   }

//   readExcelFile(file: File): void {
//     const reader = new FileReader();
//     reader.onload = (e: any) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//       if (excelData.length > 0) {
//         const firstRow = excelData[0] as { [key: string]: any };
//         const tableColumns = Object.keys(firstRow);
//         this.excelFiles.push({ name: file.name, date: this.selectedDate, data: excelData, columns: tableColumns });
//       }
//     };
//     reader.readAsArrayBuffer(file);
//   }

//   saveFile(): void {
//     this.showTables = true;
//   }

//   viewFile(index: number): void {
//     this.showTables = true;
//     const file = this.excelFiles[index];
//     this.currentFileData = file.data;
//     this.tableColumns = file.columns;
//     this.showDetails = true;
//   }

//   deleteFile(index: number): void {
//     this.excelFiles.splice(index, 1);
//   }

//   searchTable(): void {
//     if (this.searchText) {
//       const found = this.currentFileData.some((row) => {
//         return Object.values(row).some((value:any) => {
//           return value.toString().includes(this.searchText);
//         });
//       });

//       this.isTextFound = found;
//     } else {
//       this.isTextFound = false;
//     }
//   }
// }


import { Component,OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
// import correctSound from '../../../assets/sounds/correctsound.mp3';
import { HttpClient } from '@angular/common/http';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';



@Component({
  selector: 'app-excel-file-upload',
  templateUrl: './excel-file-upload.component.html',
  styleUrls: ['./excel-file-upload.component.scss']
})
export class ExcelFileUpload implements OnInit {
//   email = new FormControl('', [Validators.required, Validators.email]);

  department: string = 'hey';
  selectedDate: string = '';
  excelFiles: any[] = []; // Array to store Excel file data
  showTables: boolean = false; // Flag to control tables visibility
  showDetails: boolean = false; // Flag to control search input and result visibility
  showValidityResult: boolean = false; // Flag to control validity result visibility
  searchText: string = ''; // Text to search
  validityText: string = ''; // Text to check validity
  validityResult: string = ''; // Validity result (1 or 0)
  isTextFound: boolean = false; // Flag to indicate text found
  currentFileData: any[] = []; // Data of the currently viewed Excel file
  tableColumns: string[] = []; // Array to store column names
  // tableColumns: string[] = ['Roll No', 'Name', 'Validity', 'Validity Date'];

  correctAudio: HTMLAudioElement = new Audio();
  incorrectAudio: HTMLAudioElement = new Audio();
  showMark: boolean= false;

  showFirstPage: boolean= false;
  showSecondPage: boolean = false;

  validEntries: number = 0;
  barredEntries: number = 0;

  name!: string;

  // constructor(private http: HttpClient) {
    // this.http.get('assets/sounds/correctsound.mp3', { responseType: 'blob' })
    //   .subscribe((blob) => {
    //     const objectURL = URL.createObjectURL(blob);
    //     this.correctAudio.src = objectURL;
    //   });
    // this.loadSound('assets/sounds/correctsound.mp3', this.correctAudio);
  // }

  constructor(private http: HttpClient) {
    // Load the correct sound MP3 file using HttpClient
    this.loadSound('assets/sounds/correctsound.mp3', this.correctAudio);

    // Load the incorrect sound MP3 file using HttpClient
    this.loadSound('assets/sounds/incorrectsound.mp3', this.incorrectAudio);
  }
  
  ngOnInit(): void {
    this.showFirstPage=true;
    this.showSecondPage=false;
  }

  onFileChange(event: any): void {
    // You can keep this function empty since we're adding files on the "Add File" button click.
  }

  addFile(fileInput: any): void {
    if (this.selectedDate) {
      const files = fileInput.files;
      if (files) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          this.readExcelFile(file);
        }
      }
    } else {
      alert('Please select a date before adding files.');
    }
  }

  

  readExcelFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 2 });
      if (excelData.length > 1) { // Check if there is data (more than one row) in the table
        const firstRow = excelData[1] as { [key: string]: any }; // Use the second row (index 1) as the header
        const tableColumns = Object.keys(firstRow);
        this.excelFiles.push({ name: file.name, date: this.selectedDate, data: excelData, columns: tableColumns });
      }
      // if (excelData.length > 1) {
      //   const firstRow = excelData[1] as { [key: string]: any };
      //   const tableColumns = this.tableColumns; // Use predefined column headers
      //   this.excelFiles.push({ name: file.name, date: this.selectedDate, data: excelData, columns: tableColumns });
      // }
    };
    reader.readAsArrayBuffer(file);
  }
  
  

  saveFile(): void {
    this.showTables = true;
  }

  viewFile(index: number): void {
    this.showTables = true;
    const file = this.excelFiles[index];
    this.currentFileData = file.data;
    this.tableColumns = file.columns;
    this.showDetails = true;
    this.showFirstPage = false;
    this.showSecondPage = true;
  }

  deleteFile(index: number): void {
    this.excelFiles.splice(index, 1);
  }

  // searchTable(): void {
  //   if (this.searchText) {
  //     const found = this.currentFileData.some((row) => {
  //       return Object.values(row).some((value:any) => {
  //         return value.toString().includes(this.searchText);
  //       });
  //     });

  //     this.isTextFound = found;
  //     this.showValidityResult=true;
  //   } else {
  //     this.isTextFound = false;
  //   }
  // }

  searchTable(): void {
    if (this.searchText) {
      const found = this.currentFileData.some((row) => {
        return Object.values(row).some((value:any) => {
          return value.toString().includes(this.searchText);
        });
      });
  
      this.isTextFound = found;
  
      if (found) {
        this.showValidityResult = true; // Only set it to true if the text is found
        // this.checkValidity(); // Call checkValidity() only when there's valid input
      }
    } else {
      this.isTextFound = false;
    }
  }

  
 
  // checkValidity(): void {
  //   if (this.validityText && this.tableColumns.includes('Roll No') && this.tableColumns.includes('Validity')) {
  //     const rowWithText = this.currentFileData.find((row) => {
  //       return row['Roll No'].toString() === this.validityText;
  //     });
  
  //     if (rowWithText) {
  //       const validityValue = rowWithText['Validity'].toString();
  //       console.log(`Validity Value: ${validityValue}`);
  //       if(validityValue=="1"){
  //         console.log("you can enter")
  //       }
  //       else{
  //         console.log("you can not enter");
  //       }
  //     } else {
  //       console.log('Text not found in the table.');
  //     }
  //   } else {
  //     console.log('Invalid input or missing columns.');
  //   }
  // }

  checkValidity(): void {

    if (this.validityText) {
      const found = this.currentFileData.some((row) => {
        return Object.values(row).some((value:any) => {
          return value.toString().includes(this.validityText);
        });
      });
  
      this.isTextFound = found;
  
      if (found) {
        this.showValidityResult = true; // Only set it to true if the text is found
        // this.checkValidity(); // Call checkValidity() only when there's valid input
        if (this.validityText && this.tableColumns.includes('Roll No') && this.tableColumns.includes('Validity')) {
          const rowWithText = this.currentFileData.find((row) => {
            return row['Roll No'].toString() === this.validityText;
          });
      
          if (rowWithText) {
            const validityValue = rowWithText['Validity'].toString();
            console.log(`Validity Value: ${validityValue}`);
            const studentName = rowWithText['Name'].toString();
            this.name = studentName;
            if(validityValue=="1"){
              // this.isTextFound = found;
              this.showMark=true;
              this.correctAudio.play();
              this.validEntries=this.validEntries+1;
              console.log("you can enter")
              console.log('entries',this.validEntries);
            }
            else{
              // this.isTextFound = !this.isTextFound;
              this.showMark=false;
              this.incorrectAudio.play();
              this.barredEntries=this.barredEntries+1;
              console.log("you can not enter");
            }
          } else {
            console.log('Text not found in the table.');
          }
        } else {
          console.log('Invalid input or missing columns.');
        }
      
    } else {
      this.showMark=false;
      this.incorrectAudio.play()
      this.barredEntries = this.barredEntries+1;
      this.isTextFound = false;
      this.name="Not Exist";
    }
  }
  }


  playSound(): void {
    this.correctAudio.play();
  }
  private loadSound(filePath: string, audioElement: HTMLAudioElement): void {
    this.http.get(filePath, { responseType: 'blob' })
      .subscribe((blob) => {
        const objectURL = URL.createObjectURL(blob);
        audioElement.src = objectURL;
      });
  }
    
  }

  // checkValidity(): void {
  //   if (this.validityText && this.tableColumns.includes('Roll No') && this.tableColumns.includes('Validity')) {
  //     const rowWithText = this.currentFileData.find((row) => {
  //       return row['Roll No'].toString() === this.validityText;
  //     });
  
  //     if (rowWithText) {
  //       const validityValue = rowWithText['Validity'].toString();
  //       if (validityValue === '1') {
  //         this.validityResult = '1'; // Set to '1' for checkmark
  //       } else {
  //         this.validityResult = '0'; // Set to '0' for X
  //       }
  //       this.isTextFound = true; // Text is found
  //     } else {
  //       this.validityResult = '0'; // Set to '0' for X if text not found
  //       this.isTextFound = false; // Text not found
  //     }
  //   } else {
  //     console.log('Invalid input or missing columns.');
  //   }
  // }
  
  
  
  // checkValidity(): void {
  //   if (this.tableColumns.includes('Roll No') && this.tableColumns.includes('Validity')) {
  //     console.log('Column Names:', this.tableColumns);
  //   } else {
  //     console.log('Columns "Roll No" and "Validity" are not found.');
  //   }
  //   console.log("xxx Mayank")
  // }
  
  
