import {Component} from '@angular/core';

@Component({
    templateUrl: './scrollable-demo.component.html',
    styleUrls: ['./scrollable-demo.component.scss']
})
export class ScrollableDemoComponent
{


}


@Component({

    selector: 'w-demo-card',
    template: `
        <div class="card-demo">
            <span><ng-content></ng-content></span>
        </div>
`,
    styleUrls: ['./scrollable-demo.component.scss']
})
export class DemoCardTestComponent
{


}
