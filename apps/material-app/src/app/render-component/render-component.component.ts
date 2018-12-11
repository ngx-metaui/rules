import {Component, Input, OnInit} from '@angular/core';
import {Environment} from '@ngx-metaui/rules';

@Component({
  selector: 'ngx-metaui-render',
  templateUrl: './render-component.component.html',
  styles: []
})
export class RenderComponentComponent implements OnInit {

  @Input()
  type: string;


  len: number = 0;

  content: string = '';

  constructor(private env: Environment) {
  }

  ngOnInit() {
    const map: Map<any, any> = this.env.peak('data');
    this.len = map.size;
    map.forEach((v, k) => {
      this.content += `${k}=${v}, `;
    });
  }

}
