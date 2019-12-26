import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../model/user';
import {Supplier} from '../model/supplier';


@Component({
  selector: 'fdp-supplier-view-v',
  templateUrl: './supplier-view.component.html',
  styleUrls: ['./supplier-view.component.scss']
})
export class SupplierViewComponent implements OnInit, AfterViewInit {
  supplier: Supplier;

  constructor(private route: ActivatedRoute, private _cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    console.log('asdfafsd');
    this.route.data.subscribe((data: Array<any>) => {
      this.supplier = data['entity'][0];
    });
  }

  onBack(): void {
    window.history.back();
  }

  ngAfterViewInit(): void {
    this._cd.detectChanges();
  }
}

