/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverCardComponent } from './hover-card.component';
import { AWOverlayModule } from '../overlay/overlay.module';
import { AWStringFieldModule } from '../string/string.module';
var AWHoverCardModule = /** @class */ (function () {
    function AWHoverCardModule() {
    }
    AWHoverCardModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        HoverCardComponent
                    ],
                    imports: [
                        CommonModule,
                        AWOverlayModule,
                        AWStringFieldModule
                    ],
                    entryComponents: [
                        HoverCardComponent
                    ],
                    exports: [
                        HoverCardComponent
                    ],
                    providers: []
                },] },
    ];
    return AWHoverCardModule;
}());
export { AWHoverCardModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG92ZXItY2FyZC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYXJpYmF1aS9jb21wb25lbnRzLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9ob3Zlci1jYXJkL2hvdmVyLWNhcmQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDOzs7OztnQkFHM0QsUUFBUSxTQUFDO29CQUNOLFlBQVksRUFBRTt3QkFDVixrQkFBa0I7cUJBQ3JCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLGVBQWU7d0JBQ2YsbUJBQW1CO3FCQUN0QjtvQkFDRCxlQUFlLEVBQUU7d0JBQ2Isa0JBQWtCO3FCQUNyQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsa0JBQWtCO3FCQUNyQjtvQkFDRCxTQUFTLEVBQUUsRUFBRTtpQkFDaEI7OzRCQTNDRDs7U0E0Q2EsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtIb3ZlckNhcmRDb21wb25lbnR9IGZyb20gJy4vaG92ZXItY2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHtBV092ZXJsYXlNb2R1bGV9IGZyb20gJy4uL292ZXJsYXkvb3ZlcmxheS5tb2R1bGUnO1xuaW1wb3J0IHtBV1N0cmluZ0ZpZWxkTW9kdWxlfSBmcm9tICcuLi9zdHJpbmcvc3RyaW5nLm1vZHVsZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgSG92ZXJDYXJkQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgQVdPdmVybGF5TW9kdWxlLFxuICAgICAgICBBV1N0cmluZ0ZpZWxkTW9kdWxlXG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgSG92ZXJDYXJkQ29tcG9uZW50XG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEhvdmVyQ2FyZENvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBBV0hvdmVyQ2FyZE1vZHVsZVxue1xufVxuXG5cbiJdfQ==