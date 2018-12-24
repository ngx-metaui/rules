import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {
  MatButtonModule,
  MatCardModule, MatDatepickerModule, MatFormFieldModule,
  MatGridListModule,
  MatIconModule, MatNativeDateModule,
  MatRadioModule,
  MatSelectModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialRulesModule} from '@ngx-metaui/material-rules';
import {MetaConfig, MetaUIRulesModule} from '@ngx-metaui/rules';
import * as userRules from './rules/user-rules';
import {NestedComponentComponent} from './nested-component/nested-component.component';
import {RenderComponentComponent} from './render-component/render-component.component';


@NgModule({
  declarations: [AppComponent, NestedComponentComponent, RenderComponentComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,

    MatCardModule,
    MatGridListModule,

    MetaUIRulesModule.forRoot(),
    MaterialRulesModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


  constructor(private config: MetaConfig) {
    // mandatory - you need to register user's defined rules and types since there is no
    // introspection in js

    const rules: any[] = config.get('metaui.rules.user-rules') || [];
    rules.push(userRules);
    config.set('metaui.rules.user-rules', rules);
  }
}
