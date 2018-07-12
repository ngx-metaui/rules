/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/primeng';
import { AWStringFieldModule } from '../string/string.module';
import { RichTextAreaComponent } from '../rich-text-area/rich-text-area.component';
var AWRichTextAreaModule = /** @class */ (function () {
    function AWRichTextAreaModule() {
    }
    AWRichTextAreaModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        RichTextAreaComponent
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        EditorModule,
                        AWStringFieldModule
                    ],
                    entryComponents: [
                        RichTextAreaComponent
                    ],
                    exports: [
                        RichTextAreaComponent,
                        ReactiveFormsModule,
                        FormsModule
                    ],
                    providers: []
                },] },
    ];
    return AWRichTextAreaModule;
}());
export { AWRichTextAreaModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmljaC10ZXh0LWFyZWEubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFyaWJhdWkvY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbIndpZGdldHMvcmljaC10ZXh0LWFyZWEvcmljaC10ZXh0LWFyZWEubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQzs7Ozs7Z0JBR2hGLFFBQVEsU0FBQztvQkFDTixZQUFZLEVBQUU7d0JBQ1YscUJBQXFCO3FCQUN4QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsWUFBWTt3QkFDWixtQkFBbUI7cUJBQ3RCO29CQUNELGVBQWUsRUFBRTt3QkFDYixxQkFBcUI7cUJBQ3hCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxxQkFBcUI7d0JBQ3JCLG1CQUFtQjt3QkFDbkIsV0FBVztxQkFDZDtvQkFDRCxTQUFTLEVBQUUsRUFBRTtpQkFDaEI7OytCQWhERDs7U0FpRGEsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IFNBUCBBcmliYVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqXG4gKlxuICovXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtFZGl0b3JNb2R1bGV9IGZyb20gJ3ByaW1lbmcvcHJpbWVuZyc7XG5pbXBvcnQge0FXU3RyaW5nRmllbGRNb2R1bGV9IGZyb20gJy4uL3N0cmluZy9zdHJpbmcubW9kdWxlJztcbmltcG9ydCB7UmljaFRleHRBcmVhQ29tcG9uZW50fSBmcm9tICcuLi9yaWNoLXRleHQtYXJlYS9yaWNoLXRleHQtYXJlYS5jb21wb25lbnQnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFJpY2hUZXh0QXJlYUNvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBFZGl0b3JNb2R1bGUsXG4gICAgICAgIEFXU3RyaW5nRmllbGRNb2R1bGVcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgICAgICBSaWNoVGV4dEFyZWFDb21wb25lbnRcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgUmljaFRleHRBcmVhQ29tcG9uZW50LFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBBV1JpY2hUZXh0QXJlYU1vZHVsZVxue1xufVxuXG5cbiJdfQ==