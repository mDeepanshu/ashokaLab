import { Injectable } from '@angular/core';
import { ResponseType } from './models/responseType';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ErrMsgModuleComponent } from './err-msg-module/err-msg-module.component';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MainServiceService {
  private url: string = 'http://192.168.1.3:3000';
  localWorking: string = 'http://localhost:3000';
  localNotWorking: string = 'https://hospital-hoshangabad.herokuapp.com';
  login = new Subject<boolean>();
  navBarFor = 1;
  printOpd = new Subject<any>();
  reportValArr = new Subject<any>();
  reportParamsArr = new Subject<any>();
  constructor(private http: HttpClient, public dialog: MatDialog) {}
  makeLogin(pin: String) {
    return new Promise((response, reject) => {
      this.http
        .get<ResponseType>(`${this.url}/authorize?pin=${pin}`)
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  checkForErr(statusCode: Number, message: String) {
    if (statusCode != 200) {
      this.dialog.open(ErrMsgModuleComponent, { data: message });
      return true;
    } else {
      return false;
    }
  }
  getMedicine(val: string) {
    return new Promise((response, reject) => {
      this.http
        .get<ResponseType>(
          `${this.url}/pharmacy/item/match?type=item_name&value=${val}&limit=3`
        )
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  matchParty(name: string) {
    return new Promise((response, reject) => {
      this.http
        .get<ResponseType>(
          `${this.url}/pharmacy/party/match?type=party_name&value=${name}&limit=3`
        )
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  getLabs() {
    return new Promise((response, reject) => {
      this.http
        .get<ResponseType>(`${this.url}/lab/tests/all`)
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  pendingTest() {
    return new Promise((response, reject) => {
      this.http
        .get<ResponseType>(`${this.url}/lab/pending-tests`)
        .pipe(
          map((resData: any) => {
            console.log('resData.message', resData.message);
            for (const property in resData.message) {
              let date = new Date(
                resData.message[property].patient_data.date_of_birth
              );
              resData.message[
                property
              ].patient_data.date_of_birth = `${date.getDate()}/${
                date.getMonth() + 1
              }/${date.getFullYear()}`;
            }
            return resData;
          })
        )
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  labParams(_id: string) {
    return new Promise((response, reject) => {
      this.http
        .get<ResponseType>(`${this.url}/lab/test?test_id=${_id}`)
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  saveLabReport(reportId: string, obj: any) {
    return new Promise((response, reject) => {
      this.http
        .post<ResponseType>(
          `${this.url}/lab/report?lab_report_id=${reportId}
        `,
          obj
        )
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  matchLab(val: string) {
    return new Promise((response, reject) => {
      this.http
        .get<ResponseType>(
          `${this.url}/lab/match?type=lab_name&value=${val}&limit=4`
        )
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  matchTest(val: string) {
    return new Promise((response, reject) => {
      this.http
        .get<ResponseType>(
          `${this.url}/lab/test/match?type=test_name&value=${val}&limit=4`
        )
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  newLab(obj: any) {
    return new Promise((response, reject) => {
      this.http
        .post<ResponseType>(`${this.url}/lab/new`, obj)
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  newLabTest(obj: any) {
    return new Promise((response, reject) => {
      this.http
        .post<ResponseType>(`${this.url}/lab/test/new`, obj)
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  testParameters(_id: string, obj: any) {
    return new Promise((response, reject) => {
      this.http
        .post<ResponseType>(
          `${this.url}/lab/test/parameter?test_id=${_id}`,
          obj
        )
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
}
