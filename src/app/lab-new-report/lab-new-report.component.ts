import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-lab-new-report',
  templateUrl: './lab-new-report.component.html',
  styleUrls: ['./lab-new-report.component.css'],
})
export class LabNewReportComponent implements OnInit {
  constructor(private mainService: MainServiceService) {}

  paramsList: any[] = [];
  testOption: any[] = [];
  labOption: any[] = [];
  test_id: any = null;
  lab_id: string = '';
  public timer: any;
  nameData = new FormGroup({
    lab_name: new FormControl(null, Validators.required),
    test_name: new FormControl(null, Validators.required),
    lab_id: new FormControl(null, Validators.required),
    test_id: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
  });
  params = new FormGroup({
    name: new FormControl(null, Validators.required),
    normal_range: new FormControl(null, Validators.required),
    unit: new FormControl(null, Validators.required),
  });
  ngOnInit(): void {}
  onSubmit() {
    this.paramsList.push(this.params.value);
    this.params.reset();
  }
  saveReport() {
    let form = this.nameData.value;
    let obj = {
      test_name: form.test_name,
      lab_id: form.lab_id,
      price: form.price,
    };
    if (this.test_id == null) {
      this.mainService.newLabTest(obj).then((data: any) => {
        this.mainService
          .testParameters(data.lab_id, this.paramsList)
          .then((data) => {
            console.log(data);
          });
      });
    } else {
      this.mainService
        .testParameters(this.test_id, this.paramsList)
        .then((data) => {
          console.log(data);
        });
    }
  }
  matchTest(val: string) {
    clearTimeout(this.timer);
    this.testOption = [];
    this.timer = setTimeout(() => {
      this.mainService.matchTest(val).then((arr: any) => {
        console.log(arr);
        this.testOption = arr;
      });
    }, 500);
  }
  matchLab(val: string) {
    clearTimeout(this.timer);
    this.labOption = [];
    this.timer = setTimeout(() => {
      this.mainService.matchLab(val).then((arr: any) => {
        console.log(arr);
        this.labOption = arr;
      });
    }, 500);
  }
  onTestSelect(val: any, event: any) {
    if (event.isUserInput) {
      this.test_id = val._id;
      console.log(val);

      this.params.patchValue({
        price: val.price,
      });
      console.log(this.test_id);
    }
  }
  onLabSelect(val: any, event: any) {
    if (event.isUserInput) {
      this.lab_id = val;
      console.log(this.lab_id);
    }
  }
  removeItem(i: number) {
    this.paramsList.splice(i, 1);
  }
}
