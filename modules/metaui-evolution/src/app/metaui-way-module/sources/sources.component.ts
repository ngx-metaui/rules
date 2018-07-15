import {Component} from '@angular/core';
import {BaseComponent} from '@aribaui/components';
import {Environment} from '@aribaui/core';


@Component({
    templateUrl: './sources.component.html',
    styleUrls: ['./sources.component.scss']
})
export class SourcesComponent extends BaseComponent
{

    constructor(public env: Environment)
    {
        super(env);

    }
}

