import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountsVo } from 'src/app/@shared/dto/accounts.dto';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.scss']
})

export class AccountComponent{
    accounts!: AccountsVo;

    ngOnInit(): void {
        const accountsSection ={} as AccountsVo;
        accountsSection.salaryType= '';
        accountsSection.basicSalary=0;
        accountsSection.tds=0;
        accountsSection.da=0;
        accountsSection.pf=0;
        accountsSection.hra=0;
        accountsSection.professionalTax=0;
        accountsSection.others=0;
        accountsSection.leaveDeduction=0;
        accountsSection.total=0;
        accountsSection.bankName='';
        accountsSection.accountNo=0;
        accountsSection.accountType='';
        accountsSection.accountName='';
        accountsSection.ifsc='';
        accountsSection.branch='';
        this.accounts=accountsSection;
    }

     /* ************************************ Constructors ************************************ */
     
    

     /* ************************************ Public Methods ************************************ */
     

    
    /* ************************************ Private Methods ************************************ */
    
}