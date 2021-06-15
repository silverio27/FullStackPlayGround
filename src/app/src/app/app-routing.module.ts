import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetEditComponent } from './pet-edit/pet-edit.component';
import { PetTableComponent } from './pet-table/pet-table.component';

const routes: Routes = [
  { path: 'new', component: PetEditComponent },
  { path: 'edit/:id', component: PetEditComponent },
  { path: 'table', component: PetTableComponent },
  { path: '', pathMatch: 'full', redirectTo: 'table' },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
