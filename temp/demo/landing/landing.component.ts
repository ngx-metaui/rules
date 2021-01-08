import {Component} from '@angular/core';

@Component({
  selector: 'fdp-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  showActionPanel = true;

  constructor() {
  }


  ngOnInit() {

  }


  quickLinks($event: any) {
    alert('quick: ' + $event);
  }

  onCreate($event: any) {
    alert($event);

  }

}


export interface NewsItem {
  text: string;
  link: string;
}
