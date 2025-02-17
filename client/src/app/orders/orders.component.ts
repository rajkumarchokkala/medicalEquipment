import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit 
{
  showError: boolean = false;
  errorMessage: any;
  showMessage: boolean = false;
  successMessage!: string;
  statusModel: any = { newStatus: null };
  orderForm: FormGroup;
  showModal: boolean = false;
  selectedOrderId: number | null = null;
  orderList:any[]=[];
  newStatus=['Initiated','Delivered'];


  constructor(
    private httpService: HttpService,
    private as: AuthService,
    private fb: FormBuilder
  ) {
    this.orderForm = this.fb.group({
      newStatus: ['']
    });
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.httpService.getorders().subscribe(
      (data: any) => {
        this.orderList = data.sort((a:any,b:any)=>{
          return b.status.localeCompare(a.status);
        });
      (error: any) => {
        this.showError = true;
        this.errorMessage = error.message;
      }
  });
  }

  update(order: any) 
  {
    this.selectedOrderId = order.id;
    this.orderForm.controls['newStatus'].setValue(order.status);
    const orderToEdit = this.orderList.find(order => order.id === this.selectedOrderId);
    if (orderToEdit) 
    {
      this.statusModel.newStatus = orderToEdit.status;
      this.showModal = true;
    }
  }

  saveUpdate() {
    if (this.statusModel.newStatus && this.selectedOrderId !== null) 
      {
      this.httpService.UpdateOrderStatus(this.statusModel.newStatus, this.selectedOrderId).subscribe(
        (response: any) => 
        {
          this.showMessage = true;
          this.successMessage = 'Order updated successfully!';
          this.getOrders();
          this.showModal = false;
          this.selectedOrderId = null;
          setTimeout(() => 
          {
            this.showMessage = false;
          }, 2000);
        },
        (error: any) => {
          this.showError = true;
          this.errorMessage = error.message;
          setTimeout(() => {
            this.showError = false;
          }, 2000);
        }
      );
    }
  }

  cancelUpdate() 
  {
    this.showModal = false;
    this.selectedOrderId = null;
  }
}