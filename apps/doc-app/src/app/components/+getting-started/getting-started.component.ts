import { Component } from '@angular/core';

@Component({
  selector: 'app-oss-rules',
  template: `<app-markdown [mdFile]="mdFile"></app-markdown>`
})
export class GettingStartedComponent {
  mdFile: string = require('!!raw-loader!./getting-started.doc.md');

  constructor() {
  }
}
