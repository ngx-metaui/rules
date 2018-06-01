import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/primeng';
import {DateAndTimeComponent} from './date-and-time.component';
import {AWStringFieldModule} from '../string/string.module';

@NgModule({
    declarations: [
        DateAndTimeComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CalendarModule,
        AWStringFieldModule
    ],
    entryComponents: [
        DateAndTimeComponent
    ],
    exports: [
        DateAndTimeComponent,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class AWDateAndTimeModule
{
}


