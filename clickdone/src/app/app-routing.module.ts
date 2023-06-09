import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentsComponent } from './documents/documents.component';
import { TextTemplate } from './models/document';
import { ListAddEditComponent } from './studenten/list-add-edit/list-add-edit.component';
import { StudentenComponent } from './studenten/studenten.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'documents', component: DocumentsComponent, pathMatch: 'full', 
    data: { formData: TextTemplate }},
  {path: 'students', component: StudentenComponent, pathMatch: 'full', 
    data: { title: 'Students' }},
  {path: 'student/:id', component: ListAddEditComponent},
  {path: 'student-add', component: ListAddEditComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
