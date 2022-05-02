import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { PagesWrapperRoutingModule } from './pages-wrapper-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PagesWrapperComponent } from './pages-wrapper.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';



@NgModule({
  declarations: [
    PagesWrapperComponent,
    HeaderComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    PagesWrapperRoutingModule,
    MatProgressSpinnerModule
  ]
})
export class PagesWrapperModule { }
