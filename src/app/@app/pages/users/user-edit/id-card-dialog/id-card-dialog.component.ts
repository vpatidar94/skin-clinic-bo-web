import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepartmentVo, UserEmpDto, UserVo } from 'aayam-clinic-core';
import { KeyValueStorageService } from 'src/app/@shared/service/key-value-storage.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-id-card-dialog',
    templateUrl: './id-card-dialog.component.html',
    styleUrls: ['./id-card-dialog.component.scss']
})
export class IdCardDialogComponent implements OnInit {

    /* ************************************ Static Fields ************************************ */

    /* ************************************ Instance Fields ************************************ */
    staff!: UserEmpDto;
    bucketUrl = environment.bucketUrl;
    empOrgId!: string;
    secondIdCard!: boolean

    @Input()
    departmentList!: DepartmentVo[];

    /* ************************************ Constructors ************************************ */
    constructor(public dialogRef: MatDialogRef<IdCardDialogComponent>,
        private keyValueStorageService: KeyValueStorageService,
        @Inject(MAT_DIALOG_DATA) public data: any) {


    }

    /* ************************************ Public Methods ************************************ */
    public ngOnInit(): void {
        this.staff = this.data.staff;
        this.secondIdCard = this.data.secondIdCard;
        this.departmentList = this.data.departmentList;

        const orgId = this.keyValueStorageService.getOrgId();
        if (!orgId) {
            return;
        }
        this.empOrgId = orgId;
    }

    public onNoClick(): void {
        this.dialogRef.close();
    }

    public getDepartmentName(row: UserVo): string {
        const departmentId = row.emp[this.empOrgId].departmentId;
        const department = this.departmentList?.find(dep => dep._id === departmentId);
        return department ? department.name : '';

    }

    public printBarcode() {

        const printContents = document?.getElementById('printable-content')?.innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents ?? '';

        window.print();

        document.body.innerHTML = originalContents;
        this.dialogRef.close();
    }

    /* ************************************ Private Methods ************************************ */
}
