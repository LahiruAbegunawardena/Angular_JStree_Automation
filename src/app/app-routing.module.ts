import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import {HomePageComponent} from './components/home-page/home-page.component';
import {OrgPageComponent} from './components/org-page/org-page.component';
import {JsTreeGenComponent} from './components/js-tree-gen/js-tree-gen.component';

const routes: Routes = [
  // { path: '', component: HomePageComponent}
  { path: '', component: OrgPageComponent},
  { path: 'jsGen', component: JsTreeGenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
