import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';

@Component({
    selector: 'app-metaui-way-form',
    templateUrl: './metaui-way-form.component.html',
    styleUrls: ['./metaui-way-form.component.scss']
})
export class MetauiWayFormComponent implements OnInit
{

    userObject: User;


    constructor()
    {
    }

    ngOnInit()
    {
        this.userObject = new User('Peter', 'Pan', 8, 'BEST', 'peter@neverland.com');
    }

}
