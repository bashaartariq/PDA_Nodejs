import { Component, OnInit,Input } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  patientCases: any[] = [];
  pages: number[] = [1,2,3,4,5,6];
  page: number = 0;
  pageSize: number = 5;
  searchTerm: string = '';
  filteredCases: any[] = [];
  selectedCaseAppointments: any[] = [];
  selectedCaseId: number | null = null;
  constructor(private Service:AuthService){}
  ngOnInit() {
    this.initializeCases();
    console.log(this.filteredCases);
  }
  initializeCases():void{
    this.Service.getCases().subscribe((response)=>{
      this.patientCases = response;
      console.log(this.patientCases);
      this.filteredCases = [...this.patientCases];
    }); 
  }
  view(case_id:any):void{
    console.log(case_id);
    if (case_id) {
      this.selectedCaseId = case_id;
      this.Service.getAppointment(case_id).subscribe((response)=>{
        console.log(response);
        this.selectedCaseAppointments = response;
      })
    } else {
      console.error('Case ID is undefined');
  }}
  editAppointment(appointment_id:number){
    console.log(appointment_id);
  }
  filterCases() {
    const term = this.searchTerm.toLowerCase();
    this.filteredCases = this.patientCases.filter((caseItem:any) =>
      caseItem.category.toLowerCase().includes(term) ||
      caseItem.purpose_of_visit.toLowerCase().includes(term) ||
      caseItem.case_type.toLowerCase().includes(term) ||
      caseItem.insurance_name.toLowerCase().includes(term) ||
      caseItem.firm_name.toLowerCase().includes(term) ||
      caseItem.practice_location_name.toLowerCase().includes(term)
    );
    this.page = 0;
  }
  onPage(event: any) {
    this.page = event.offset;
  }
  setPage(page: number) {
    this.page = page;
  }
  nextPage() {
    if (this.page < this.filteredCases.length / this.pageSize - 1) {
      this.page++;
    }
  }
  previousPage() {
    if (this.page > 0) {
      this.page--;
    }
  }
}
