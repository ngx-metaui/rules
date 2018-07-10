import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import {PlaygroundAppModule} from './app/playground-app.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(PlaygroundAppModule)
  .catch(err => console.log(err));
