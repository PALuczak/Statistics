import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Module6RoutingModule } from './module6-routing.module';
import { Module6Component } from './module6.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [Module6Component],
  imports: [
    CommonModule,
    Module6RoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class Module6Module { }
