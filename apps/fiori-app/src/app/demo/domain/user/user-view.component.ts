import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../model/user';


@Component({
  selector: 'fdp-user-view-v',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit, AfterViewInit {
  user: User;

  constructor(private route: ActivatedRoute, private _cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: Array<any>) => {
      this.user = data['entity'][0];
    });
  }

  onBack(): void {
    window.history.back();
  }

  ngAfterViewInit(): void {
    this._cd.detectChanges();
  }
}

