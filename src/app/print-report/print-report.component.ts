import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-print-report',
  templateUrl: './print-report.component.html',
  styleUrls: ['./print-report.component.css'],
})
export class PrintReportComponent implements OnInit {
  constructor(public mainService: MainServiceService) {}
  paramsList: any[] = [];
  values: any[] = [];
  patient = {
    first_name: '',
    last_name: '',
    age: '',
  };
  test_name: string = '';
  ngOnInit() {
    this.mainService.reportValArr.subscribe((data) => {
      this.test_name = data.b;
      this.values = data.a;
      this.patient = data.c;
    });
    this.mainService.reportParamsArr.subscribe((data) => {
      console.log(data);
      this.paramsList = data;
    });
  }
}
