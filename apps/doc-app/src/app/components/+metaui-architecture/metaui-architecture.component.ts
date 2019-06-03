import { Component } from '@angular/core';

@Component({
  selector: 'app-metaui-architecture',
  template: `<app-markdown [mdFile]="mdFile"></app-markdown>`,
})
export class MetauiArchitectureComponent {
  mdFile: string = require('!!raw-loader!./metaui-architecture.doc.md');

  constructor() { }
}
