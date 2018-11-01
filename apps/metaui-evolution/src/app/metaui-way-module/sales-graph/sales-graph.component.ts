import {Component} from '@angular/core';
import {BaseComponent, Environment} from '@ngx-metaui/rules';


@Component({
    template: `<img src="assets/images/sales.png" width="100%"/> `,
    styleUrls: ['./sales-graph.component.scss']
})
export class SalesGraphComponent extends BaseComponent
{

    constructor(public env: Environment)
    {
        super(env);

    }
}

