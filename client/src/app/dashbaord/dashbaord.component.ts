import { HttpContextToken } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { ThisReceiver } from '@angular/compiler';
import { Router } from '@angular/router';


import Aos from 'aos';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})
export class DashbaordComponent implements OnInit {

  hospitals: any = [];
  orderList: any = [];
  maintenanceList: any = [];
  role!: any;
  hospitalCount: number = 0;
  equipmentCount: number = 0;
  equipmentId!: number;
  equipmentList: any = [];
  orderCount: number = 0;
  hospital: any;
  selectedHospitalEquipment: any = [];
  maintenanceListCount: number = 0;
  username!: string | null;
  inititedCount: number = 0;
  pendingList: any[] = [];
  pendingMaintanance:any[]=[];



  constructor(private hs: HttpService, private as: AuthService, private rou: Router) {

    this.role = localStorage.getItem('role');

    console.log(this.role);
    this.getHospital();
    this.getOrders();
    this.getMaintenance();
    // this.onHospitalSelect(this.hospital); 

  }
  ngOnInit(): void {
    this.getPending();
this.getMaintenance();
    console.log(this.pendingList);

    Aos.init({
      duration: 1200, // Animation duration
      once: true, // Whether animation should happen only once
    });
    this.username = localStorage.getItem('username');
    console.log(this.username)
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
        console.log("order list",this.orderList);
        this.orderCount = this.orderList.length;
        this.pendingList = this.orderList.filter((val: any) => {
          return val.status === 'Initiated';
        })
        console.log('pending list',this.pendingList);
      },

    );
  }


  getPending() {

    
  }



  getHospital() {
    this.hs.getHospital().subscribe((data) => {
      this.hospitals = data;
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


  getMaintenance() {
    this.maintenanceList = this.hs.getMaintenance().subscribe((data) => {
      console.log(data);
      
      this.maintenanceList = data;
      console.log(this.maintenanceList);
      
      this.maintenanceListCount = this.maintenanceList.length;
      this.pendingMaintanance = this.maintenanceList.filter((val:any)=>
      {
        return val.status === 'Pending';
      })
    })
    console.log("pending list",this.pendingMaintanance);
  }

}
