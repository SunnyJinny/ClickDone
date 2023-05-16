import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { TextFieldModule } from '@angular/cdk/text-field';
import { QuillModule } from 'ngx-quill';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentsComponent } from './documents/documents.component';
import { StudentenComponent } from './studenten/studenten.component';
import { BodyComponent } from './body/body.component';
import { ChartComponent } from './dashboard/chart/chart.component';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { ListAddEditComponent } from './studenten/list-add-edit/list-add-edit.component';
import { ProgressStepComponent } from './documents/progress/progress-step/progress-step.component';
import { ProgressStepDirective } from './documents/progress/progress-step.directive';
import { ProgressComponent } from './documents/progress/progress.component';
import { DocumentStepComponent } from './documents/document-step/document-step.component';
import { DocumentTemplateComponent } from './documents/document-step/document-template/document-template.component';


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    DashboardComponent,
    DocumentsComponent,
    StudentenComponent,
    BodyComponent,
    ChartComponent,
    ListAddEditComponent,
    ProgressStepComponent,
    ProgressStepDirective,
    ProgressComponent,
    DocumentStepComponent,
    DocumentTemplateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FontAwesomeModule,
    NgChartsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatCheckboxModule,
    MatSortModule,
    MatSelectModule,
    TextFieldModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule.forRoot()
  ],
  providers: [
    { provide: NgChartsConfiguration, useValue: { generateColors: false }},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
