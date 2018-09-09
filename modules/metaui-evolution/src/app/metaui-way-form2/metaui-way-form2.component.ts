import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';

@Component({
    selector: 'app-metaui-way-form2',
    templateUrl: './metaui-way-form2.component.html',
    styleUrls: ['./metaui-way-form2.component.scss']
})
export class MetauiWayForm2Component implements OnInit
{

    user: User;


    constructor()
    {
    }

    ngOnInit()
    {
        this.user = new User('pp', 'Peter', 'Pan', 8,
            new Date());
    }

}
