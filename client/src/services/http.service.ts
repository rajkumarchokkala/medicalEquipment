// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { map, Observable } from 'rxjs';
// import { environment } from '../environments/environment.development';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class HttpService {
//   public serverName=environment.apiUrl;
//   constructor(private http: HttpClient, private authService:AuthService) 
//   {

//   }
 
 
//   UpdateOrderStatus(newStatus:any,orderId:any):Observable<any> 
//   {
//     const authToken = this.authService.getToken();
//     let headers = new HttpHeaders();
//     headers = headers.set('Content-Type', 'application/json');
//     headers = headers.set('Authorization', `Bearer ${authToken}`);
//     return this.http.put<any>(this.serverName+'/api/supplier/order/update/'+orderId+'?newStatus='+newStatus,{},{headers:headers});
//   }

//   addEquipment(details:any,hospitalId: any): Observable<any> {
//     const authToken = this.authService.getToken();
//     let headers = new HttpHeaders();
//     headers = headers.set('Content-Type', 'application/json');
//     headers = headers.set('Authorization', `Bearer ${authToken}`);
//     return this.http.post<any>(
//       `${this.serverName}/api/hospital/equipment?hospitalId=${hospitalId}`,
//       details, // Body
//       { headers: headers }
//     );
//   }
  
//   getMaintananceById(maintenanceId:any):Observable<any>{
//     return this.http.get(this.serverName + "/api/hospital/maintenance" + maintenanceId).pipe(map((data) => {
//       if (Array.isArray(data)) {
//         return data;
//       }
//       else {
//         return [data];
//       }
//     }));
     
//   }

//   getorders():Observable<any> {
   
//     const authToken = this.authService.getToken();
//     let headers = new HttpHeaders();
//     headers = headers.set('Content-Type', 'application/json');
//     headers = headers.set('Authorization', `Bearer ${authToken}`)
//     return this.http.get(this.serverName+`/api/supplier/orders`,{headers:headers});
//   }

//   getMaintenance():Observable<any> 
//   {
//     const authToken = this.authService.getToken();
//     let headers = new HttpHeaders();
//     headers = headers.set('Content-Type', 'application/json');
//     headers = headers.set('Authorization', `Bearer ${authToken}`)
//     return this.http.get(this.serverName+`/api/technician/maintenance`,{headers:headers});
//   }
//   getHospital():Observable<any> {
   
//     const authToken = this.authService.getToken();
//     let headers = new HttpHeaders();
//     headers = headers.set('Content-Type', 'application/json');
//     headers = headers.set('Authorization', `Bearer ${authToken}`)
//     return this.http.get(this.serverName+`/api/hospitals`,{headers:headers});
//   }
//   getEquipmentById(id:any):Observable<any> {
   
//     const authToken = this.authService.getToken();
//     let headers = new HttpHeaders();
//     headers = headers.set('Content-Type', 'application/json');
//     headers = headers.set('Authorization', `Bearer ${authToken}`)
//     return this.http.get(this.serverName+`/api/hospital/equipment/`+id,{headers:headers});
//   }
 
//   updateMaintenance(details:any,maintenanceId:any):Observable<any> {
  
//     const authToken = this.authService.getToken();
//     let headers = new HttpHeaders();
//     headers = headers.set('Content-Type', 'application/json');
//     headers = headers.set('Authorization', `Bearer ${authToken}`);
//     return this.http.put(this.serverName+'/api/technician/maintenance/update/'+maintenanceId,details,{headers:headers});
//   }
//   orderEquipment(details:any,equipmentId:any):Observable<any> {
  
//     const authToken = this.authService.getToken();
//     let headers = new HttpHeaders();
//     headers = headers.set('Content-Type', 'application/json');
//     headers = headers.set('Authorization', `Bearer ${authToken}`);
//     return this.http.post(this.serverName+'/api/hospital/order?equipmentId='+equipmentId,details,{headers:headers});
//   }
//   scheduleMaintenance(details:any,equipmentId:any):Observable<any> {
  
//     const authToken = this.authService.getToken();
//     let headers = new HttpHeaders();
//     headers = headers.set('Content-Type', 'application/json');
//     headers = headers.set('Authorization', `Bearer ${authToken}`);
//     return this.http.post(this.serverName+'/api/hospital/maintenance/schedule?equipmentId='+equipmentId,details,{headers:headers});
//   }
//   createHospital(details:any):Observable<any> {
  
//     const authToken = this.authService.getToken();
//     let headers = new HttpHeaders();
//     headers = headers.set('Content-Type', 'application/json');
//     headers = headers.set('Authorization', `Bearer ${authToken}`);
//     return this.http.post(this.serverName+'/api/hospital/create',details,{headers:headers});
//   }
//   Login(details:any):Observable<any> {
    
//     let headers = new HttpHeaders();
//     headers = headers.set('Content-Type', 'application/json');
//     return this.http.post(this.serverName+'/api/user/login',details,{headers:headers})
//   }
//   registerUser(details:any):Observable<any> {
//     let headers = new HttpHeaders();
//     headers = headers.set('Content-Type', 'application/json');
//     return this.http.post(this.serverName+'/api/user/register',details,{headers:headers});
//   } 

//   deleteMaintenance(maintenanceId:any):Observable<any>
//   {
//     const authToken = this.authService.getToken();
//     let headers = new HttpHeaders();
//     headers = headers.set('Content-Type', 'application/json');
//     headers = headers.set('Authorization', `Bearer ${authToken}`)
//     return this.http.delete(this.serverName+`/api/technician/maintenance/`+maintenanceId,{headers:headers});
//   }
// }



import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth.service';
import { Feedback } from '../app/model/feedback';

 
@Injectable({
  providedIn: 'root'
})
export class HttpService {
 
  public serverName = environment.apiUrl;
 
  constructor(private http: HttpClient, private authService: AuthService) {
 
  }
 
  UpdateOrderStatus(newStatus: any, orderId: any): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    return this.http.put<any>(this.serverName + '/api/supplier/order/update/' + orderId + '?newStatus=' + newStatus, {}, { headers: headers });
  }
 
  addEquipment(details: any, hospitalId: any): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    return this.http.post<any>(
      `${this.serverName}/api/hospital/equipment?hospitalId=${hospitalId}`,
      details, // Body
      { headers: headers }
    );
  }
 
  getMaintananceById(maintenanceId: any): Observable<any> {
    return this.http.get(this.serverName + "/api/hospital/maintenance" + maintenanceId).pipe(map((data) => {
      if (Array.isArray(data)) {
        return data;
      }
      else {
        return [data];
      }
    }));
  }
 
  getorders(): Observable<any> {
 
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`)
    return this.http.get(this.serverName + `/api/supplier/orders`, { headers: headers });
  }
 
  getMaintenance(): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`)
    return this.http.get(this.serverName + `/api/technician/maintenance`, { headers: headers });
  }
  getHospital(): Observable<any> {
 
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`)
    return this.http.get(this.serverName + `/api/hospitals`, { headers: headers });
  }
  getEquipmentById(id: any): Observable<any> {
 
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`)
    return this.http.get(this.serverName + `/api/hospital/equipment/` + id, { headers: headers });
  }
 
  updateMaintenance(details: any, maintenanceId: any): Observable<any> {
 
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    return this.http.put(this.serverName + '/api/technician/maintenance/update/' + maintenanceId, details, { headers: headers });
  }
  orderEquipment(details: any, equipmentId: any): Observable<any> {
 
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    return this.http.post(this.serverName + '/api/hospital/order?equipmentId=' + equipmentId, details, { headers: headers });
  }
 
  scheduleMaintenance(details: any, equipmentId: any): Observable<any> {
 
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    return this.http.post(this.serverName + '/api/hospital/maintenance/schedule?equipmentId=' + equipmentId, details, { headers: headers });
  }
 
  createHospital(details: any): Observable<any> {
 
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`);
    return this.http.post(this.serverName + '/api/hospital/create', details, { headers: headers });
  }
  Login(details: any): Observable<any> {
 
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.serverName + '/api/user/login', details, { headers: headers })
  }
  registerUser(details: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.serverName + '/api/user/register', details, { headers: headers });
  }
 
  deleteMaintenance(maintenanceId: any): Observable<any> {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`)
    return this.http.delete(this.serverName + `/api/technician/maintenance/` + maintenanceId, { headers: headers });
  }
 
  addFeedback(details:any):Observable<Feedback>
  {
    return this.http.post<Feedback>(this.serverName + '/api/feedback/create', details);
  }
 
  public getFeedbacksByMaintenanceId(maintenanceId:any):Observable<any>
  {
    return this.http.get<any>(this.serverName+`/api/feedback/maintenance/`+maintenanceId);
  }
 
  public getFeedbacksByOrderId(orderId:any):Observable<any>
  {
    return this.http.get<any>(this.serverName+`/api/feedback/order/`+orderId);
  }
 
  public getAllFeedbacks():Observable<any[]>
  {
    return this.http.get<any[]>(this.serverName+`/api/feedback`);
  }
 
  public getUser(username:any):Observable<any>{
    return this.http.get<any>(this.serverName+`/api/user/`+username);
  }
}