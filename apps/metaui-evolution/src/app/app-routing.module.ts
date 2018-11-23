import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HtmlWayFormComponent} from './html-way-form/html-way-form.component';
import {MetauiWayFormComponent} from './metaui-way-form/metaui-way-form.component';
import {MetauiWayForm2Component} from './metaui-way-form2/metaui-way-form2.component';
import {ComponentWayFormComponent} from './component-way-form/component-way-form.component';
import {MetauiWayModuleComponent} from './metaui-way-module/metaui-way-module.component';
import {
    ProductContentComponent
} from './metaui-way-module/product-content/product-content.component';
import {SourcesComponent} from './metaui-way-module/sources/sources.component';
import {MetauiWayNestingComponent} from './metaui-way-nesting/metaui-way-nesting.component';
import {MetaHomePageComponent} from '@ngx-metaui/primeng-rules';



export const ModuleRoutes: Routes = [
    {
        path: '', redirectTo: '/html', pathMatch: 'full'
    },
    {path: 'html', component: HtmlWayFormComponent},
    {path: 'component', component: ComponentWayFormComponent},
    {path: 'metaui', component: MetauiWayFormComponent},
    {path: 'metaui2', component: MetauiWayForm2Component},
    {path: 'metaui3', component: MetauiWayNestingComponent},
    {
        path: 'module', component: MetauiWayModuleComponent,
        children: [
            {path: 'home', component: MetaHomePageComponent},
            {path: 'products', component: ProductContentComponent},
            {path: 'sources', component: SourcesComponent}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(ModuleRoutes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule
{
}
