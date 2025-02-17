import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from '../model/feedback';



@Component({
  selector: 'app-maintenance-status',
  templateUrl: './maintenance-status.component.html',
  styleUrls: ['./maintenance-status.component.scss']
})
export class MaintenanceStatusComponent implements OnInit {

  maintenanceList: any = [];
  hospitalList = [];
  currentmaintenance: any;
  feedbackForm!: FormGroup;
  feedForm: boolean = false;
  showMessage: boolean = false;
  successMessage: any;
  showError: boolean = false;
  errorMessage: any;
  userDetails: any;
  userName: any;
  hospital: any = {};
  rating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];
  constructor(private httpService: HttpService, private fb: FormBuilder) {

  }

  ngOnInit(): void {

    this.userName = (localStorage.getItem("username"));
    console.log(this.userName);
    this.httpService.getUser(this.userName).subscribe((data) => {
      console.log("Inside UserGet");
      this.userDetails = data;
      console.log(this.userDetails);
    }
    )


    this.feedbackForm = this.fb.group
      (
        {
          feedbackText: [''],
          rating: [''],
          recommend: ['']
        }
      )
    this.getHospitals();
    this.getMaintenance();
  }

  getHospitals() {
    this.httpService.getHospital().subscribe((data) => {
      this.hospitalList = data;
    })
  }

  getMaintenance() {
    this.maintenanceList = this.httpService.getMaintenance().subscribe((data) => {
      this.maintenanceList = data;
    })
  }

  addFeedback(maintenance: any) {
    this.currentmaintenance = maintenance;
    console.log(this.currentmaintenance);
    this.feedForm = true;
  }

  closeshowRejectModal() {
    this.feedForm = false;
  }

  onSubmit() {
    console.log("Before adding");
    this.hospital = this.currentmaintenance.equipment.hospital;
    console.log("Hospital Object");
    console.log(this.hospital);


    let feedback: Feedback =
    {
      feedbackText: this.feedbackForm.value.feedbackText,
      rating: this.feedbackForm.value.rating,
      recommend: this.feedbackForm.value.recommend,
      maintenance: this.currentmaintenance,
      hospital: this.hospital,
      user: this.userDetails
    }

    console.log(feedback);
    this.httpService.addFeedback(feedback).subscribe(
      {
        next: () => {
          console.log("After adding");
          this.showMessage = true;
          this.successMessage = 'Feedback submitted successfully!'
          this.feedbackForm.reset();
          setTimeout(() => {
            this.showMessage = false;
            this.feedForm = false;
          }, 2000);
        },
        error: () => {
          this.showError = true;
          this.errorMessage = "Cannot submit feedback";
          this.feedForm = false;
        }
      }
    )
  }


  setRecommend(value: string) {
    this.feedbackForm.get('recommend')?.setValue(value);
    console.log("feed back", value);
  }

  setRating(star: number): void {
    this.rating = star;
  }

  isStarActive(star: number): boolean {
    return star <= this.rating;
  }

}
