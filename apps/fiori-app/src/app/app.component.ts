import {Component} from '@angular/core';
import {animate, keyframes, query, stagger, style, transition, trigger} from '@angular/animations';

export const textAnimation = trigger('textAnimation', [
  transition('* => *', [
    query(':enter', [
      stagger(2500, [
        style({ transform: 'translateY(-100px)', opacity: '0' }),
        animate('5s', keyframes([
          style({ transform: 'translateY(-100px)', opacity: '1' }),
          style({ transform: 'translateY(0)', opacity: '1' }),
          style({ transform: 'translateY(0)', opacity: '1' }),
          style({ transform: 'translateY(100px)', opacity: '0' })
        ]))
      ])
    ], { optional: true })
  ])
]);

@Component({
  selector: 'fdp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [textAnimation]
})
export class AppComponent {
  textArray: string[] = ["Hello", "This", "Should", "Animiate"]

  constructor() {


  }

}

