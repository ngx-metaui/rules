import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Action, UIMeta} from '@ngx-metaui/rules';
import {User} from '../model/user';
import {FormGroup} from '@angular/forms';


@Component({
  selector: 'fdp-metaui-user',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, AfterViewInit {
  object: User;
  operation = 'edit';

  formGroup: FormGroup = new FormGroup({});

  constructor(protected meta: UIMeta, private _cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.meta.registerDependency('controller', this);

    this.object = new User('R0001', 'FK0001',
      'Fred', 'Flinstone', 'Some short description');
  }

  ngAfterViewInit(): void {
    this._cd.detectChanges();
  }


  updateOp(op: string): void {
    this.operation = op;
    this._cd.markForCheck();
  }

  @Action({applyTo: User, category: 'GlobalPageActions'})
  accept(object: any): void {
    console.log('Accepting : ' + object);
  }

  @Action({applyTo: User, category: 'GlobalPageActions'})
  reject(object: any): void {
    console.log('rejecting : ' + object);
  }


}

