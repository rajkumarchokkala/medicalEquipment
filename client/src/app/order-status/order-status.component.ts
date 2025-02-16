import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Feedback } from '../model/feedback';



@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {

  orderList:any[]=[];
  hospitalList=[];
  orderId:any;
  feedbackForm!:FormGroup;
  feedForm:boolean=false;
  showMessage:boolean=false;
  successMessage:any;
  showError:boolean=false;
  errorMessage:any;
  currentorder:any;
  userDetails:any ;
  userName : any;
  hospital:any={};
  rating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];


  constructor(private httpService:HttpService,private fb:FormBuilder) 
  { 
    
  }

  ngOnInit(): void 
  {
    this.userName = (localStorage.getItem("username"));
    console.log(this.userName);
    this.httpService.getUser(this.userName).subscribe((data)=>
      {
        console.log("Inside UserGet"); 
        this.userDetails=data; 
        console.log(this.userDetails);
      }
    )

    this.feedbackForm=this.fb.group
    (
      {
        feedbackText:[''],
        rating:[''],
        recommend:['']
      }
    )
    this.getHospitals();
    this.getAllOrders();
  }

  setRecommend(value: string) {
    this.feedbackForm.get('recommend')?.setValue(value);
    console.log("feed back",value);
}

  getHospitals()
  {
    this.httpService.getHospital().subscribe((data)=>
    {
      this.hospitalList=data;
    })
  }

  getAllOrders()
  {
    this.httpService.getorders().subscribe((data)=>
    {
      this.orderList=data;
    })
  }

  addFeedback(order:any)
  {
    this.currentorder=order;
    this.feedForm=true;
  }

  closeshowRejectModal()
  {
    this.feedForm = false;
  }

  selectedRating: number = 0;

// setRating(value: number) {
//     this.selectedRating = value;
//     this.feedbackForm.patchValue({ rating: value });
// }

// // Check if star should be active
// isStarActive(value: number): boolean {
//     return value <= this.selectedRating;
// }


setRating(star: number): void {
    this.rating = star;
  }

  isStarActive(star: number): boolean {
    return star <= this.rating;
  }




  onSubmit()
  {
    this.hospital= this.currentorder.equipment.hospital;
    let feedback:Feedback = 
    {
      feedbackText:this.feedbackForm.value.feedbackText,
      rating:this.feedbackForm.value.rating,
      recommend:this.feedbackForm.value.recommend,
      order:this.currentorder,
      hospital:this.hospital,
      user:this.userDetails
    }
    this.httpService.addFeedback(feedback).subscribe(
      {
        next:()=>
          {
            this.showMessage=true;
            this.successMessage='Feedback submitted successfully!';
            this.feedbackForm.reset();
            setTimeout(()=>
            {
              this.showMessage=false;
              this.feedForm=false;
            },2000);
          },
          error:()=>
          {
            this.showError=true;
            this.errorMessage="Cannot submit feedback";
            this.feedForm=false;
          }
      }
    )
  }
}
