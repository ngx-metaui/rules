import {Component, OnInit} from '@angular/core';
import {<%=  classify(modelClass) %>} from <%if (flat) { %>'./<%= dasherize(modelPath) %>/<%= dasherize(modelClass) %>' <% } else { %>'../<%= dasherize(modelPath) %>/<%= dasherize(modelClass) %>' <% } %>;



@Component({
  selector: 'app-<%=dasherize(name)%>',
  templateUrl: './<%=dasherize(name)%>.component.html',
  styleUrls: ['./<%=dasherize(name)%>.component.scss']
})
export class <%= classify(name) %>Component implements OnInit {

  object: <%= classify(modelClass) %>;
  operation = 'view';

  constructor() {
  }

  ngOnInit(): void {

    this.object = new <%= classify(modelClass) %>('R0001', 'Frank Kolar',
    'This is my user record', new Date());
  }
}

