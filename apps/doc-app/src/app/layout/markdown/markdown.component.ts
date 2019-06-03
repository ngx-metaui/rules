import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import * as marked from 'marked';
import { HeadingsListService } from '../../services/headings-list.service';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { AnchorScrollService } from '../../services/anchor-scroll.service';
import { filter } from 'rxjs/operators';

declare var Prism: {
  highlightAll: (async: boolean) => void;
  highlightAllUnder: (element: Element) => void;
};

@Component({
  selector: 'app-markdown',
  template: '<ng-content></ng-content>',
})
export class MarkdownComponent implements OnInit, AfterViewInit {
  @Input() mdFile: string;
  activeRoute: string;
  activeFragment: string;

  constructor(
    private element: ElementRef<HTMLElement>,
    private headingsListService: HeadingsListService,
    private router: Router,
    private anchorScrollService: AnchorScrollService
  ) {
    this.router.events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd)
      )
      .subscribe((event: RouterEvent) => {
        this.activeRoute = event.url.split('#')[0].replace('/', '');
        this.activeFragment = event.url.split('#')[1];

        if (this.activeFragment) {
          this.anchorScrollService.scrollToTarget(this.activeFragment);
        }
      });
  }

  ngOnInit(): void {
    this.setUpMarkedRenderer();
    this.render();
  }

  ngAfterViewInit(): void {
    this.anchorScrollService.scrollToTarget(this.activeFragment);
  }

  render(): void {
    /* parse markdown and replace innerHTML of component */
    this.element.nativeElement.innerHTML = marked.parse(this.mdFile);
    /* highlight syntax by PrismJS */
    Prism.highlightAllUnder(this.element.nativeElement);
    /* get list of main headings for nav menu */
    this.headingsListService.getHeaders(this.element.nativeElement);
    /* add default styling classes for 'pre' tags without specified language */
    this.addDefaultCodeStyling();
  }

  addDefaultCodeStyling(): void {
    const codeElements = this.element.nativeElement.querySelectorAll('pre');
    codeElements.forEach((item: HTMLElement) => {
      const classCheck = item.classList.value.indexOf('language-') > 0;

      if (!item.classList.length && !classCheck) {
        item.classList.add('language-default');
      }
    });
  }

  setUpMarkedRenderer(): void {
    const markedRenderer = new marked.Renderer();

    /* set up link template for parser */
    markedRenderer.link = (href: string, title: string, text: string) => {
      title = title || ''; // because if title empty it receives null

      /*
         prepare href for routing with useHash true
         cases that this regular expression covers:
         '/', './', '../', '#', '#/'
      */
      href = href.replace(/^(\/|\.\/|\.\.\/|#\/?)(.*)/, (...args) => {
        return (args[1] === '#') ?
          '#/' + this.activeRoute + args[0] : // case when route starts with '#'
          '#/' + args[2]; // other cases
      });

      return (`<a href=\"${href}\" title=\"${title}\">${text}</a>`);
    };

    marked.setOptions({
      renderer: markedRenderer
    });
  }
}
