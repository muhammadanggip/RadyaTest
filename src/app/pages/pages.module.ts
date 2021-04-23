import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './page-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { Index1Component } from './index1/index1.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [Index1Component],
  imports: [
    CommonModule, 
    ScrollToModule.forRoot(),
     PagesRoutingModule, 
     SharedModule, 
     NgbModalModule, 
     HttpClientModule,
     ReactiveFormsModule,
    NgxYoutubePlayerModule
  ]
})
export class PagesModule { }
