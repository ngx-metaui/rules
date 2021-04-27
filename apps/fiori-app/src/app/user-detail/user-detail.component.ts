import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Action, UIMeta} from '@ngx-metaui/rules';
import {User} from '../model/user';
import {FormGroup} from '@angular/forms';
import {AlertConfig, AlertService} from '@fundamental-ngx/core';


@Component({
  selector: 'fdp-metaui-user',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, AfterViewInit {
  object: User;
  operation = 'edit';

  formGroup: FormGroup = new FormGroup({});

  constructor(protected meta: UIMeta, private _cd: ChangeDetectorRef,
              public alertService: AlertService) {
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
    this.alertService.open('Successfully Accepted!', {
      type: 'success',
      width: '100vw',
      dismissible: true,
      duration: 2000
    } as AlertConfig);
  }

  @Action({applyTo: User, category: 'GlobalPageActions'})
  reject(object: any): void {
    console.log('rejecting : ' + object);
  }


}

