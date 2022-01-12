import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../main-service.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css'],
})
export class LabComponent implements OnInit {
  constructor(
    public mainService: MainServiceService,
    private fb: FormBuilder
  ) {}
  reportParameters: any[] = [];
  defaultSelected = -1;
  selection: number = 0;
  lab_report_id = '';
  selectedPatientId = '';
  print_patient_data = <any>{};
  selectedLabData = <any>{};
  labReport = new FormGroup({
    params: new FormArray([]),
  });
  ngOnInit() {
    this.mainService.pendingTest().then((data: any) => {
      for (const property in data) {
        let d = new Date(data[property].date);
        let date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
        data[property].date = date;
        this.reportParameters.push(data[property]);
      }
    });
  }
  labParams(_id: string) {
    this.mainService.labParams(_id).then((data: any) => {
      console.log('datadatadata', data);
      this.selectedLabData = data;
      data.parameters.forEach((element: any) => {
        const control = new FormControl(null, Validators.required);
        (<FormArray>this.labReport.get('params')).push(control);
      });
    });
  }
  selectLab(_id: any, ii: number, i: number) {
    this.selection = ii;
    this.print_patient_data = this.reportParameters[i].patient_data;
    this.lab_report_id = this.reportParameters[i].tests[ii].lab_report_id;
    console.log(this.lab_report_id);
    this.labParams(_id);
  }
  get getControls() {
    return (<FormArray>this.labReport.get('params')).controls;
  }
  onSubmit() {
    console.log(this.labReport.value);
    let arr: any[] = [];
    for (let i = 0; i < this.labReport.value.params.length; i++) {
      arr.push({
        name: this.selectedLabData.parameters[i].name,
        unit: this.selectedLabData.parameters[i].unit,
        reading: this.labReport.value.params[i],
      });
    }
    this.mainService.saveLabReport(this.lab_report_id, arr);
  }
  print() {
    console.log(this.selectedLabData);

    this.mainService.reportValArr.next({
      a: this.labReport.value.params,
      b: this.selectedLabData.test_name,
      c: this.print_patient_data,
    });
    this.mainService.reportParamsArr.next(this.selectedLabData.parameters);
    setTimeout(() => {
      window.print();
    }, 0);
  }
  replace(name: string, age: any) {
    this.print_patient_data.first_name = name;
    this.print_patient_data.age = age;
  }
  clear() {
    (<FormArray>this.labReport.get('params')).clear();
  }
}
