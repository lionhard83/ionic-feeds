import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { SigninPage } from './signin.page';

const routes: Routes = [
  {
    path: '',
    component: SigninPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule],
  exports: [RouterModule],
})
export class SigninPageRoutingModule {}
