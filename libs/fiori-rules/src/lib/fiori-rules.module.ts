import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UILibModule} from './ui/ui.module';

@NgModule({
  imports: [
    CommonModule,
    UILibModule
  ],
  exports: [
    UILibModule
  ]
})
export class FioriRulesModule {
}
