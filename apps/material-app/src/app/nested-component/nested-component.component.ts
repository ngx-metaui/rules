import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {Environment} from '@ngx-metaui/rules';

/**
 * NESTED component tester. It shows how angular components are evaluated in order to show
 * how metaUI context push/pop needs to work
 */
@Component({
  selector: 'ngx-metaui-nc',
  templateUrl: './nested-component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
  providers: []
})
export class NestedComponentComponent implements OnInit, OnDestroy,
  AfterViewInit, AfterViewChecked, OnChanges, DoCheck {


  @Input()
  key: string;

  @Input()
  value: string;

  // @ViewChild('data')
  // renderTemplate: TemplateRef<any>;


  private viewInitialized: boolean = false;

  constructor(public env: Environment) {
  }

  ngOnInit() {

    console.log('=> ngOnInit:', this.contextKey());

    const data: Map<any, any> = this.env.peak('data');
    if (!data) {
      this.env.push('data', new Map().set(this.key, this.value));
    } else {
      data.set(this.key, this.value);
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('    => ngOnChanges', this.contextKey());
  }

  ngDoCheck(): void {
    if (this.viewInitialized) {
      console.log('=> ngDoCheck(CHANGED)', this.contextKey());

      const data: Map<any, any> = this.env.peak('data');
      if (!data) {
        this.env.push('data', new Map().set(this.key, this.value));
      } else {
        data.set(this.key, this.value);
      }

    }
  }

  ngAfterViewInit(): void {
    if (!this.viewInitialized) {
      console.log('=> ngAfterViewInit:', this.contextKey());

      const data: Map<any, Map<string, string>> = this.env.peak('data');
      data.delete(this.key);
    }
  }

  ngAfterViewChecked(): void {
    if (this.viewInitialized) {
      console.log('=> ngAfterViewChecked:', this.contextKey());


      const data: Map<any, Map<string, string>> = this.env.peak('data');
      data.delete(this.key);

    } else {
      this.viewInitialized = true;
    }
  }

  renderingContent(): string {


    let content = '';
    const data: Map<any, Map<string, string>> = this.env.peak('data');
    data.forEach((v, k) => {
      content += `<b>${k}</b>: ${v}, `;
    });
    console.log('=> renderingContent:' + this.contextKey() + ' => ' + content);

    return content;
  }


  ngOnDestroy(): void {
  }


  contextKey(): string {
    return `${this.key}-${this.value}`;
  }


}
