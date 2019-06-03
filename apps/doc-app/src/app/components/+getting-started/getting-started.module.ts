import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GettingStartedRoutingModule } from './getting-started-routing.module';
import { GettingStartedComponent } from './getting-started.component';
import { MarkdownModule } from '../../layout/markdown/markdown.module';

@NgModule({
  declarations: [
    GettingStartedComponent
  ],
  imports: [
    CommonModule,
    GettingStartedRoutingModule,
    MarkdownModule
  ],
})
export class GettingStartedModule { }
