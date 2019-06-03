import { Component } from '@angular/core';

@Component({
  selector: 'app-oss-rules',
  template: `<app-markdown [mdFile]="mdFile"></app-markdown>`
})
export class OssRulesComponent {
  mdFile: string = require('!!raw-loader!./oss-rules.doc.md');

  constructor() {
  }
}
