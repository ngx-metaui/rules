import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DATA_PROVIDERS, DataProvider} from '@ngx-metaui/fiori-rules';


@Injectable({
  providedIn: 'root'
})
export class DemoEntityResolver implements Resolve<any> {
  constructor(@Inject(DATA_PROVIDERS) private providers: Map<string, DataProvider<any>>,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    const id = route.paramMap.get('id');
    const type = route.url[2].path;
    const dataProvider = this.providers.get(type);
    dataProvider.setLookupKey('uniqueName');

    return dataProvider.fetch(new Map().set('query', id).set('fullText', false));
  }
}
