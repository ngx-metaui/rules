import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';

@Component({
    selector: 'app-html-way-form',
    templateUrl: './html-way-form.component.html',
    styleUrls: ['./html-way-form.component.scss']
})
export class HtmlWayFormComponent implements OnInit
{

    errorMsg = '';
    userObject: User;

    constructor()
    {
    }

    ngOnInit()
    {
        this.userObject = new User('Peter', 'Pan', 8, 'BEST', 'peter@neverland.com');
    }


    hasErrors(): boolean
    {
        return false;
    }

}
