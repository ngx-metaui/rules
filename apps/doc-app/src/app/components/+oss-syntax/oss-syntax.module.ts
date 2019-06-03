import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OssSyntaxRoutingModule } from './oss-syntax-routing.module';
import { OssSyntaxComponent } from './oss-syntax.component';
import { MarkdownModule } from '../../layout/markdown/markdown.module';

@NgModule({
  declarations: [
    OssSyntaxComponent
  ],
  imports: [
    CommonModule,
    OssSyntaxRoutingModule,
    MarkdownModule
  ],
})
export class OssSyntaxModule { }
