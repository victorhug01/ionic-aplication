import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdensPage } from './ordens.page';

const routes: Routes = [
  {
    path: '',
    component: OrdensPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdensPageRoutingModule {}
