import {Component} from '@angular/core';
import {BaseComponent, Environment} from '@ngx-metaui/rules';


@Component({
    templateUrl: './sources.component.html',
    styleUrls: ['./sources.component.scss']
})
export class SourcesComponent extends BaseComponent {

  constructor(public env: Environment) {
    super(env);

  }
}

