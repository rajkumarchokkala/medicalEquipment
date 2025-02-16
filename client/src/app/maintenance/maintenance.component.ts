import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
  providers: [DatePipe]
})
export class MaintenanceComponent implements OnInit {
  itemForm!: FormGroup;
  formModel: boolean = false;
  showError: boolean = false;
  errorMessage: any;
  showMessage: boolean = false;
  successMessage: any;
  maintenanceList: any = [];
  status = ['Pending', 'Completed'];
  maintenanceId: number | any;
  localDeleteId: number | any;
  showDelete: boolean = false;

  constructor(private service: HttpService, private fb: FormBuilder, private route: ActivatedRoute, private datePipe: DatePipe) {
    this.itemForm = this.fb.group({
      scheduledDate: ['', [Validators.required]],
      completedDate: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]],
    }, { validators: this.dateRangeValidator });
  }

  ngOnInit(): void {
    this.getMaintenance();
  }

  dateRangeValidator(group: FormGroup): ValidationErrors | null {
    const startDate = group.controls['scheduledDate'].value;
    const endDate = group.controls['completedDate'].value;

    if (startDate && endDate && endDate < startDate) {
      return { 'dateRangeInvalid': true };
    }
    return null;
  }

  getMaintenance() {
    this.service.getMaintenance().subscribe((data) => {
      this.maintenanceList = data;
    });
  }

  update(maintenance: any) {
    this.itemForm.controls['scheduledDate'].setValue(maintenance.scheduledDate);
    this.itemForm.controls['completedDate'].setValue(maintenance.completedDate);
    this.itemForm.controls['description'].setValue(maintenance.description);
    this.itemForm.controls['status'].setValue(maintenance.status);
    this.maintenanceId = maintenance.id;

    const orderToEdit = this.maintenanceList.find((maintenance: any) => maintenance.id === this.maintenanceId);
    if (orderToEdit) {
      this.formModel = true;
    }
  }

  deleteMaintenance(id: any) {
    this.localDeleteId = id;
    this.showDelete = true;
  }

  onSubmit() {
    if (this.itemForm.valid) {
      this.service.updateMaintenance(this.itemForm.value, this.maintenanceId).subscribe({
        next: () => {
          this.getMaintenance();
          this.showMessage = true;
          this.successMessage = 'Maintenance updated successfully!';
          this.itemForm.reset();
          setTimeout(() => {
            this.formModel = false;
            this.showMessage = false;
          }, 1000);
        },
        error: () => {
          this.showError = true;
          this.errorMessage = 'Cannot update the form';
          setTimeout(() => {
            this.formModel = false;
            this.showMessage = false;
          }, 1000);
        }
      });
    }
  }

  closeedit() {
    this.formModel = false;
  }

  deleteFinal() {
    this.service.deleteMaintenance(this.localDeleteId).subscribe(() => this.getMaintenance());
    this.showDelete = false;
  }

  closeDelete() {
    this.showDelete = false;
  }
}