/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListboxModule } from 'primeng/primeng';
import { ListComponent } from './list.component';
import { AWCheckBoxModule } from '../checkbox/check-box.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
export class AWListModule {
}
AWListModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ListComponent
                ],
                imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    FormsModule,
                    ListboxModule,
                    AWCheckBoxModule
                ],
                entryComponents: [
                    ListComponent
                ],
                exports: [
                    ListComponent,
                    ReactiveFormsModule,
                    FormsModule
                ],
                providers: []
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9saXN0L2xpc3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUF5QmhFLE1BQU07OztZQXRCTCxRQUFRLFNBQUM7Z0JBQ04sWUFBWSxFQUFFO29CQUNWLGFBQWE7aUJBQ2hCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLG1CQUFtQjtvQkFDbkIsV0FBVztvQkFDWCxhQUFhO29CQUNiLGdCQUFnQjtpQkFFbkI7Z0JBQ0QsZUFBZSxFQUFFO29CQUNiLGFBQWE7aUJBQ2hCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxhQUFhO29CQUNiLG1CQUFtQjtvQkFDbkIsV0FBVztpQkFDZDtnQkFDRCxTQUFTLEVBQUUsRUFBRTthQUNoQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICpcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBTQVAgQXJpYmFcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TGlzdGJveE1vZHVsZX0gZnJvbSAncHJpbWVuZy9wcmltZW5nJztcbmltcG9ydCB7TGlzdENvbXBvbmVudH0gZnJvbSAnLi9saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQge0FXQ2hlY2tCb3hNb2R1bGV9IGZyb20gJy4uL2NoZWNrYm94L2NoZWNrLWJveC5tb2R1bGUnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIExpc3RDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgTGlzdGJveE1vZHVsZSxcbiAgICAgICAgQVdDaGVja0JveE1vZHVsZVxuXG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgTGlzdENvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBMaXN0Q29tcG9uZW50LFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBBV0xpc3RNb2R1bGVcbntcbn1cblxuXG4iXX0=