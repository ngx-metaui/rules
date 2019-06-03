import { Injectable, Inject } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { PageScrollService } from 'ngx-page-scroll-core';
import { Router } from '@angular/router';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AnchorScrollService {

  constructor(
    private pageScrollService: PageScrollService,
    private router: Router,
    @Inject(DOCUMENT) private document: any
  ) { }

  scrollToTarget(targetId: string): void {
    const parentView = this.document.getElementById('mat-content');

    if (targetId) {
      this.pageScrollService.scroll({
        document: this.document,
        scrollTarget: '#' + targetId,
        scrollViews: [
          parentView
        ],
        scrollOffset: 20,
        duration: 250
      });
    }

    if (!targetId) {
      parentView.scroll(0, 0);
    }
  }
}
