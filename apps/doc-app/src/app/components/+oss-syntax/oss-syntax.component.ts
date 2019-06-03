import {  Component } from '@angular/core';

@Component({
  selector: 'app-oss-syntax',
  template: `<app-markdown [mdFile]="mdFile"></app-markdown>`,
})
export class OssSyntaxComponent {
  mdFile: string = require('!!raw-loader!./oss-syntax.doc.md');

  constructor() { }
}
