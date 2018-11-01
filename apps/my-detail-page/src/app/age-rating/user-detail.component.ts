import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent, Environment} from '@ngx-metaui/rules';


@Component({
  selector: 'app-age-rating',
  template: `
    <span class="w-string-field">
      {{rating}}
    </span>
  `
})
export class AgeRatingComponent extends BaseComponent implements OnInit {

  @Input()
  value: any;

  rating: string;

  constructor(protected environment: Environment) {
    super(environment);
  }

  ngOnInit(): void {
    this.rating = (!this.value) ? 'N/A' : ((this.value && this.value <= 20) ? 'Young' : 'Good');
  }
}

