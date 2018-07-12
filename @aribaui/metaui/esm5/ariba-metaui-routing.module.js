/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MetaContentPageComponent } from './layout/meta-content-page/meta-content-page.component';
var /** @type {?} */ routes = [
    { path: 'context', component: MetaContentPageComponent }
];
var AribaMetaUIRoutingModule = /** @class */ (function () {
    function AribaMetaUIRoutingModule() {
    }
    AribaMetaUIRoutingModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        RouterModule.forChild(routes)
                    ],
                    exports: [RouterModule],
                    providers: []
                },] },
    ];
    return AribaMetaUIRoutingModule;
}());
export { AribaMetaUIRoutingModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJpYmEtbWV0YXVpLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvbWV0YXVpLyIsInNvdXJjZXMiOlsiYXJpYmEtbWV0YXVpLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFrQkEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFTLE1BQU0saUJBQWlCLENBQUM7QUFDckQsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sd0RBQXdELENBQUM7QUFFaEcscUJBQU0sTUFBTSxHQUFXO0lBQ25CLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsd0JBQXdCLEVBQUM7Q0FDekQsQ0FBQzs7Ozs7Z0JBRUQsUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztxQkFDaEM7b0JBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixTQUFTLEVBQUUsRUFBRTtpQkFDaEI7O21DQWhDRDs7U0FpQ2Esd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgU0FQIEFyaWJhXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICpcbiAqL1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JvdXRlck1vZHVsZSwgUm91dGVzfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtNZXRhQ29udGVudFBhZ2VDb21wb25lbnR9IGZyb20gJy4vbGF5b3V0L21ldGEtY29udGVudC1wYWdlL21ldGEtY29udGVudC1wYWdlLmNvbXBvbmVudCc7XG5cbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xuICAgIHtwYXRoOiAnY29udGV4dCcsIGNvbXBvbmVudDogTWV0YUNvbnRlbnRQYWdlQ29tcG9uZW50fVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpXG4gICAgXSxcbiAgICBleHBvcnRzOiBbUm91dGVyTW9kdWxlXSxcbiAgICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEFyaWJhTWV0YVVJUm91dGluZ01vZHVsZVxue1xufVxuIl19