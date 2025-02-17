import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';

 
 
@Component({
  selector: 'app-createhospital',
  templateUrl: './createhospital.component.html',
  styleUrls: ['./createhospital.component.scss']
})
export class CreatehospitalComponent implements OnInit
{
  itemForm!:FormGroup;
  equipmentForm!:FormGroup;
  showMessage:boolean=false;
  successMessage:any;
  showMessageEquipment:boolean=false;
  showError:boolean=false;
  errorMessage:any;
  showErrorEquipment:boolean=false;
  hospitalList:any=[];
  assignModel:any={};
  responseMessage:any;
  formModel : boolean = false;
  id:any;
 
 
  constructor(private httpService:HttpService,private fb:FormBuilder)
  {
 
  }
 
  ngOnInit(): void
  {
    this.itemForm=this.fb.group(
      {
        name:['',[Validators.required]],
        location:['',[Validators.required]]
      }
    );
    this.equipmentForm=this.fb.group({
      name:['',Validators.required],
      description:['',Validators.required]
    });
    this.getHospital();
  }
 
  getHospital()
  {
    this.httpService.getHospital().subscribe((data)=>
    {
      this.hospitalList=data;
    });
  }
 
  onSubmit()
  {
    if(this.itemForm.valid){
      this.httpService.createHospital(this.itemForm.value).subscribe(
        {
          next:()=>
          {
            this.showMessage=true;
            this.successMessage='Hospital added successfully!'
            this.itemForm.reset();
            this.getHospital();
            setTimeout(()=>
            {
              this.showMessage=false;
            },2000);
          },
          error:()=>
          {
            this.showError=true;
            this.errorMessage="Cannot create hospital";
          }
        }
      )
    }
  }
 
  Addequipment(value:any)
  {
    this.formModel = true;
    this.id=value;
  }
 
  // deleteHospital(id:any)
  // {
  //   console.log("deleted");
  //   this.httpService.deleteHospital(id).subscribe(()=>this.getHospital());
  //   console.log('after deletion');
  // }
 
  // deleteEquipment(id:any)
  // {
  //   console.log("deleted");
   
  //   this.httpService.deleteEquipment(id).subscribe(()=>this.getHospital());
  //   console.log('after deletion');
  // }
 
  submitEquipment()
  {
    if(this.equipmentForm.valid)
    {
      this.httpService.addEquipment(this.equipmentForm.value,this.id).subscribe(
      {
        next:()=>
        {
          this.showMessageEquipment=true;
          this.successMessage="Equipment Added Sucessfully";
          this.equipmentForm.reset();
          setTimeout(()=>
          {
            this.showMessageEquipment=false;
            this.formModel=false;
          },2000);
        },
        error:()=>
        {
          this.showErrorEquipment=true;
          this.errorMessage='Cannot add equipment!';
        }
      })
    }
  }
 
  closeshowRejectModal()
  {
    this.formModel = false;
  }
}
 