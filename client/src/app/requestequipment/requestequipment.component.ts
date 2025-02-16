import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
 
@Component({
  selector: 'app-requestequipment',
  templateUrl: './requestequipment.component.html',
  styleUrls: ['./requestequipment.component.scss']
})
export class RequestequipmentComponent implements OnInit
{
  itemForm!:FormGroup;
  formModel:any={status:null};
  showError:boolean=false;
  errorMessage:any;
  hospitalList:any=[];
  assignModel:any={};
  showMessage:boolean=false;
  successMessage:any;
  responseMessage:any;
  equipmentList:any=[];
  newStatus=['Ordered'];
  equipmentId:any;
  hospitalId:any;
  value:any;

  constructor(private httpService:HttpService,private fb:FormBuilder){}
  ngOnInit(): void {
    this.itemForm=this.fb.group({
      orderDate:['',[Validators.required,this.dateValidator]],
      status:['',Validators.required],
      quantity:[0,[Validators.required,Validators.min(1)]],
      hospitalId:[this.formModel.hospitalId,[Validators.required]],
      equipmentId:[this.formModel.equipmentId,[Validators.required]],
    });
    this.getHospital();
    this.onHospitalSelect(this.equipmentId);
  }
 
  getHospital()
  {
    this.httpService.getHospital().subscribe((data)=>
    {
      this.hospitalList=data;
    });
 
  }
 
  dateValidator(control:AbstractControl):ValidationErrors | null
  {
    const datePattern=/\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    if(!datePattern.test(control.value)){
      return {inval:true}
    }
    return null;
  }
 
  onHospitalSelect(event:any)
  {
    this.hospitalId=event.target.value;
    this.httpService.getEquipmentById(this.hospitalId).subscribe((data) =>
      {
      this.equipmentList = data;
    });


  }
  onSubmit()
  {
    console.log("Inside the method");
    console.log(this.itemForm.value.equipmentId);
    
    if(this.itemForm.valid)
      {
      this.httpService.orderEquipment(this.itemForm.value,this.itemForm.value.equipmentId).subscribe(
        {
          next:()=>
          {
            this.showMessage=true;
            this.successMessage='Equipment requested successfully!';
            this.itemForm.reset();
            setTimeout(()=>
            {
              this.showMessage=false;
            },2000)
          },
          error:()=>
          {
            this.showError=true;
            this.errorMessage='Cannot request equipment';
            setTimeout(()=>
            {
              this.showError=false;
            },2000)
          }
        })
    }
    else
    {
      this.itemForm.markAllAsTouched();
    }
  }
}