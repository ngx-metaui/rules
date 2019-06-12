import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocPageRoutingModule } from './doc-page-routing.module';
import { DocPageComponent } from './doc-page.component';
import { MarkdownModule } from '../../layout/markdown/markdown.module';

@NgModule({
  declarations: [
    DocPageComponent
  ],
  imports: [
    CommonModule,
    DocPageRoutingModule,
    MarkdownModule
  ],
})
export class DocPageModule { }
