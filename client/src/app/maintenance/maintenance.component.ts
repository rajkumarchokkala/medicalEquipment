import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { Observable, of } from 'rxjs';
import { DatePipe } from '@angular/common';
 
 
@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
  providers: [DatePipe]
})
export class MaintenanceComponent implements OnInit
{
  itemForm!: FormGroup;
  formModel:boolean=false;
  id:any;
  updateid: any;
  showError: boolean = false;
  errorMessage: any;
  assignModel: any = {};
  showMessage: boolean=false;
  successMessage:any;
  responseMessage: any;
  maintenanceList: any = [];
  maintenanceObj: any = {};
  status=['Pending','Completed'];
  maintenanceId:number | any;
  isAdded:boolean=false;
  localDeleteId:number | any;
  showDelete : boolean = false;
 
  constructor(private service: HttpService, private fb: FormBuilder, private route: ActivatedRoute,private datePipe: DatePipe)
  {
    this.itemForm = this.fb.group({
      scheduledDate: ['', [Validators.required]],
      completedDate: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['',[Validators.required]],
    },
    { validators: this.dateRangeValidator });
  }
 
  ngOnInit(): void
  {
    this.getMaintenance();
  }
 
  dateRangeValidator(group: FormGroup): ValidationErrors | null {
    const startDate = group.controls['scheduledDate'].value;
    const endDate = group.controls['completedDate'].value;
 
    if (startDate && endDate && endDate < startDate)
    {
        return { 'dateRangeInvalid': true };
    }
    return null;
  }
 
  dateValidator(control: AbstractControl):ValidationErrors|null
  {
    const pattern=/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    if(!pattern.test(control.value))
    {
      return {invalidDate:true};
    }
    return null;
  }
 
  getMaintenance()
  {
    this.maintenanceList=this.service.getMaintenance().subscribe((data)=>
    {
      this.maintenanceList=data;

    })
  }
 
  update(maintenance:any)
  {
    this.itemForm.controls['scheduledDate'].setValue(maintenance.scheduledDate);
    this.itemForm.controls['completedDate'].setValue(maintenance.completedDate);
    this.itemForm.controls['description'].setValue(maintenance.description);
    this.itemForm.controls['status'].setValue(maintenance.status);
    this.isAdded=true;
    this.maintenanceId=maintenance.id;
 
    const orderToEdit = this.maintenanceList.find((maintenance:any) => maintenance.id === this.maintenanceId);
    if (orderToEdit)
    {
      this.formModel=true;
    }
  }
 
  deleteMaintenance(id:any)
  {
    this.localDeleteId = id;
    this.showDelete = true;
  }
 
  onSubmit()
  {
    if (this.itemForm.valid)
    {
      this.service.updateMaintenance(this.itemForm.value,this.maintenanceId).subscribe(
      {
          next:()=>
          {
            this.getMaintenance();
            this.showMessage=true;
            this.successMessage='Maintenance updated successfully!';
            this.itemForm.reset();
            setTimeout(()=>
            {
              this.formModel=false;
              this.showMessage=false;
            },1000);
          },
          error:()=>
          {
            this.showError=true;
            this.errorMessage='Cannot update the form';
            setTimeout(()=>
            {
              this.formModel=false;
              this.showMessage=false;
            },1000);
          }
      }
      );
    }
  }
 
  closeedit()
  {
    this.formModel=false;
  }
 
  deleteFinal()
  {
    this.showDelete = true;
    this.service.deleteMaintenance(this.localDeleteId).subscribe(()=>this.getMaintenance());
    this.showDelete=false;
  }
 
  closeDelete()
  {
    this.showDelete = false;
  }
}