import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
//
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LabComponent } from './lab/lab.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LabNewReportComponent } from './lab-new-report/lab-new-report.component';
import { LoginComponent } from './login/login.component';

//
import { ErrMsgModuleComponent } from './err-msg-module/err-msg-module.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PrintReportComponent } from './print-report/print-report.component';

const routes: Routes = [
  { path: 'lab', component: LabComponent },
  { path: 'labnewreport', component: LabNewReportComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    ErrMsgModuleComponent,
    LabComponent,
    LabNewReportComponent,
    LoginComponent,
    NavBarComponent,
    PrintReportComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatSnackBarModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NoopAnimationsModule,
    MatExpansionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    FormsModule,
    MatListModule,
    MatDialogModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
