import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OssRulesRoutingModule } from './oss-rules-routing.module';
import { OssRulesComponent } from './oss-rules.component';
import { MarkdownModule } from '../../layout/markdown/markdown.module';

@NgModule({
  declarations: [
    OssRulesComponent
  ],
  imports: [
    CommonModule,
    OssRulesRoutingModule,
    MarkdownModule
  ],
})
export class OssRulesModule { }
