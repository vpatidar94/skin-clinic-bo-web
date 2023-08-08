import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AddressVo, ApiResponse, BookingVo, ItemDetailDto, KeyValueVo, ObservationVo, PrescriptionVo, ResponseStatus, UserBookingDto, UserVo } from 'aayam-clinic-core';
import { AuthService } from 'src/app/@shared/security/auth.service';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';

//newly added to show table
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserTypeVo } from 'src/app/@shared/dto/user-type.dto';
// newly added to show table
// export interface PeriodicElement {
//     userTypeCode: number;
//     userTypeName: string;
//     // ProductType: string;
//     // Price: string;
//     action: string;
// }

// newly added to show table
const ELEMENT_DATA: UserTypeVo[] = [
    { userTypeCode: 1, userTypeName: 'OPD', department: "", action: "Edit | Delete" },
    { userTypeCode: 2, userTypeName: 'Dressing', department: "", action: "Edit | Delete" },
    // { userTypeCode: 3, userTypeName: 'Blood Test', department: "", action: "Edit | Delete" },
    // { userTypeCode: 4, userTypeName: '', department: "", action: "Edit | Delete" },
    // { userTypeCode: 5, userTypeName: '', department: "", action: "Edit | Delete" },
    // { userTypeCode: 6, userTypeName: '', department: "", action: "Edit | Delete" },
    // { userTypeCode: 7, userTypeName: '', department: "", action: "Edit | Delete" },
]
@Component({
    selector: 'app-add-user-type',
    templateUrl: './add-user-type.component.html',
    styleUrls: ['./add-user-type.component.scss'],
})

export class AddUserTypeComponent implements AfterViewInit, OnInit {

    /* ************************************* Static Field ********************************************* */
    /* ************************************* Instance Field ******************************************** */
    userType!: Array<UserTypeVo>; // to show ELEMENT_DATA right now will remove it. 

    // userTypeArray = [] as UserTypeVo[]; // to show the empty array so that data of user-type form will be pushed here

    showAddUserTypeSection: boolean = false;
    toggleAddProductsSection() {
        console.log('Toggle function called');
        this.showAddUserTypeSection = !this.showAddUserTypeSection;
    }

    // newly added to show table
    displayedColumns: string[] = ['userTypeCode', 'userTypeName', 'departmentName', "action"];
    dataSource = new MatTableDataSource<UserTypeVo>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    /* ************************************* Constructors ******************************************** */
    constructor() { }

    /* ************************************* Public Methods ******************************************** */
    // newly added to show table
    public ngAfterViewInit() {
        this.paginator.showFirstLastButtons = false;
        this.paginator.hidePageSize = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    // newly added to show table
    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    public ngOnInit(): void {
        this.userType = ELEMENT_DATA;
        const userTypeDetails = {} as UserTypeVo;
        userTypeDetails.userTypeCode = 123;
        userTypeDetails.userTypeName = "";
        userTypeDetails.department = "";
        userTypeDetails.action = "Edit | Delete"
        this.userType.push(userTypeDetails);
        // this.userTypeArray.push(userTypeDetails);

        console.log("kkk", this.userType);
    }

    public saveIt(): void {
        this.userType = ELEMENT_DATA;
        const userTypeDetails = {} as UserTypeVo;
        userTypeDetails.userTypeCode = 123;
        userTypeDetails.department = "";
        userTypeDetails.action = "Edit | Delete"
        this.userType.push(userTypeDetails);
        console.log("XX XX XX,userType", this.userType);
        // this.userTypeArray.push(userTypeDetails);
        // console.log("XX XX userTypeArray", this.userTypeArray);

    }
    /* ************************************* Private Methods ******************************************** */



}
