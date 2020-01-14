import {Component, Input} from '@angular/core';
import {Address} from '../../model/address';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'fdp-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {
  @Input()
  address: Address;

  constructor(private router: Router, private route: ActivatedRoute) {
  }


}

