import { HttpContextToken } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { ThisReceiver } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})
export class DashbaordComponent implements OnInit {
  
  hospitals:any=[];
  orderList:any=[];
  maintenanceList:any=[];
  role!:any;
  hospitalCount:number = 0;
  equipmentCount:number=0;
  equipmentId!:number;
  equipmentList:any=[];
  orderCount:number=0;
  hospital:any;
  selectedHospitalEquipment:any=[];
  maintenanceListCount:number=0;

  

  constructor(private hs:HttpService , private as:AuthService,private rou:Router)
  {
    
      this.role=localStorage.getItem('role');
      console.log(this.role);
      this.getHospital();
      this.getOrders();
      this.getMaintenance();   
      // this.onHospitalSelect(this.hospital); 
     
  }
  ngOnInit(): void {
    if (!sessionStorage.getItem('reloaded')) {
      sessionStorage.setItem('reloaded', 'true');
      window.location.reload();

      
      
  } else {
      sessionStorage.removeItem('reloaded');
  }
  
  }


  getOrders() {
    this.hs.getorders().subscribe(
      (data: any) => {
        this.orderList = data;
        this.orderCount = this.orderList.length;
      },
    
    );
  }

  
 

  getHospital()
  {
    this.hs.getHospital().subscribe((data)=>
    {
      this.hospitals=data;
      this.hospitalCount = this.hospitals.length;
      
      console.log(this.hospitalCount);
      // this.onHospitalSelect(2);
    });
  }


  // onHospitalSelect(hospital:any)
  // {
  //   this.equipmentId=hospital.id;
  //   this.hs.getEquipmentById(this.equipmentId).subscribe((data) =>
  //   {
  //     console.log(data);
  //     this.equipmentList = data;
  //     this.equipmentCount = this.equipmentList.length;
  //     console.log(this.equipmentCount);
  //   });   
  // }


  // onHospitalSelect(hospital: any) {
  //   this.equipmentId = hospital.id;
  //   this.hs.getEquipmentById(this.equipmentId).subscribe((data) => {
  //     console.log(data);
  //     this.selectedHospitalEquipment = data;
  //     this.equipmentCount = this.selectedHospitalEquipment.length;
  //     console.log(this.equipmentCount);
  //   });
  // }


  getMaintenance()
  {
    this.maintenanceList=this.hs.getMaintenance().subscribe((data)=>
    {
      this.maintenanceList=data;
      this.maintenanceListCount = this.maintenanceList.length;
    })
  }

}
