import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { OrgPageComponent } from './components/org-page/org-page.component';
import {NgFlashMessagesModule} from 'ng-flash-messages';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import { JsTreeGenComponent } from './components/js-tree-gen/js-tree-gen.component';
import {NgxTreeDndModule} from 'ngx-tree-dnd';
import {TreeModule} from 'angular-tree-component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    OrgPageComponent,
    JsTreeGenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgFlashMessagesModule.forRoot(),
    NgxSmartModalModule.forRoot(),
    NgxTreeDndModule,
    TreeModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
