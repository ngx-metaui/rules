import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-doc-page',
  template: `
    <app-markdown [mdFile]="mdFile"></app-markdown>`
})
export class DocPageComponent {
  mdFile: string = 'assets/docs/getting-started.doc.md';

  constructor(public router: ActivatedRoute) {
    this.mdFile = router.snapshot.data.path;
  }
}
