import { AfterViewInit, Component, OnInit, ViewChild,EventEmitter, Input, Output } from '@angular/core';
import { AddressVo, ApiResponse, BookingVo, ItemDetailDto, KeyValueVo, ObservationVo, PrescriptionVo, ResponseStatus, UserBookingDto, UserVo } from 'aayam-clinic-core';
import { AuthService } from 'src/app/@shared/security/auth.service';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';

//newly added to show table
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductVo } from 'src/app/@shared/dto/product.dto';
import { AddDepartmentVo } from 'src/app/@shared/dto/add-department.dto';


const ELEMENT_DATA: AddDepartmentVo[] = [
    { departmentCode: 1, departmentName: 'OPD', action: "Edit | Delete" },
    { departmentCode: 2, departmentName: 'Dressing', action: "Edit | Delete" },
    { departmentCode: 3, departmentName: 'Blood Test', action: "Edit | Delete" },
    { departmentCode: 4, departmentName: '', action: "Edit | Delete" },
    // { departmentCode: 5, departmentName: '', action: "Edit | Delete" },
    // { departmentCode: 6, departmentName: '', action: "Edit | Delete" },
    // { departmentCode: 7, departmentName: '', action: "Edit | Delete" },
]
@Component({
    selector: 'app-add-department',
    templateUrl: './add-department.component.html',
    styleUrls: ['./add-department.component.scss'],
})

export class AddDepartmentComponent implements AfterViewInit, OnInit {

    /* ************************************* Static Field ********************************************* */
    /* ************************************* Instance Field ******************************************** */
    department!: Array<AddDepartmentVo>; //to show the content of ELEMENT_DATA

    // departmentArray = [] as AddDepartmentVo[]; //to push the content of the department form
    
    // @Input()
    // department!: Array<AddDepartmentVo>;
    // @Output()
    // departmentChange = new EventEmitter<Array<AddDepartmentVo>>();

    showAddDepartmentSection: boolean = false;
    toggleAddProductsSection() {
        console.log('Toggle function called');
        this.showAddDepartmentSection = !this.showAddDepartmentSection;
    }

    // newly added to show table
    displayedColumns: string[] = ['departmentCode', 'departmentName', "action"];
    dataSource = new MatTableDataSource<AddDepartmentVo>(ELEMENT_DATA);

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
        this.department = ELEMENT_DATA;
        const departmentDetails = {} as AddDepartmentVo;
        departmentDetails.departmentCode = 123;
        departmentDetails.departmentName = "";
        departmentDetails.action = "Edit | Delete"
        this.department.push(departmentDetails);
        console.log("XX XX XX,department", this.department);
        // this.departmentArray.push(departmentDetails);
        // console.log("XX XX departmentArray", this.departmentArray);
        // this.departmentChange.emit(this.department);

        
    }

    public saveIt(): void {
        this.department = ELEMENT_DATA;
        const departmentDetails = {} as AddDepartmentVo;
        departmentDetails.departmentCode = 123;
        departmentDetails.departmentName = "";
        departmentDetails.action = "Edit | Delete"
        this.department.push(departmentDetails);
        // this.departmentChange.emit(this.department);
        console.log("XX XX XX,department", this.department);
    }
    /* ************************************* Private Methods ******************************************** */
}
