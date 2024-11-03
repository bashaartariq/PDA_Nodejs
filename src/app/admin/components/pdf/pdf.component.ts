import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PDFComponent implements OnInit {
  DoctorId: any;
  dateRangeForm!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private fb: FormBuilder, private authService: AuthService) {
    this.DoctorId = data.DoctorId;
  }
  ngOnInit(): void {
    console.log(this.DoctorId);
    this.initializeForm();
  }
  initializeForm() {
    this.dateRangeForm = this.fb.group(
      {
        startDate: ['', Validators.required],
        endDate: ['', Validators.required]
      },
      {
        validators: this.dateRangeValidator
      }
    );
  }
  dateRangeValidator(group: AbstractControl): { [key: string]: boolean } | null {
    const start = group.get('startDate')?.value;
    const end = group.get('endDate')?.value;
    if (start && end && new Date(start) >= new Date(end)) {
      return { invalidDateRange: true };
    }
    return null;
  }
  onSubmit(): void {
    if (this.dateRangeForm.valid) {
      const data = {
        startDate: this.formatDate(this.dateRangeForm.value.startDate),
        endDate: this.formatDate(this.dateRangeForm.value.endDate),
        DoctorId: this.DoctorId
      };
      console.log(data);
      this.authService.getPDF(data).subscribe((response) => { console.log(response) }, (err) => { console.log(err); });
    } else {
      console.error('Form is invalid');
    }
  }
  private formatDate(date: string): string {
    return new Date(date).toISOString().split('T')[0];
  }
}