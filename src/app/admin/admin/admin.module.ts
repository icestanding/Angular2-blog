import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from "./admin.component";
import {BrowserModule} from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from "./admin-routing.module";
import { MdButtonModule } from '@angular/material';

import { QuillModule } from './editor/quill.module'
import { ShareModule } from '../../app-share.module';
import { BlogModule } from './blog/blog.module';

@NgModule({
  imports: [
   CommonModule,
   AdminRoutingModule,
   BrowserModule,
   HttpClientModule,
   MdButtonModule,
   ShareModule,
   QuillModule,
   BlogModule
  ],
  declarations: [
    AdminComponent,

  ],
  exports: [AdminComponent]
})
export class AdminModule {}