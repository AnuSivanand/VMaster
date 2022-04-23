import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { PagesWrapperRoutingModule } from './pages-wrapper-routing.module';

import { PagesWrapperComponent } from './pages-wrapper.component';
import { HeaderComponent } from 'src/app/components/header/header.component';



@NgModule({
  declarations: [
    PagesWrapperComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    PagesWrapperRoutingModule,
  ]
})
export class PagesWrapperModule { }
