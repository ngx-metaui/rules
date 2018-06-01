/**
 *
 * @license
 * Copyright 2017 SAP Ariba
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 *
 */
import {
    AfterContentInit,
    Component,
    ContentChildren,
    Input,
    OnInit,
    QueryList,
    TemplateRef
} from '@angular/core';
import {PrimeTemplate} from 'primeng/primeng';
import {isPresent} from '@aribaui/core';

/**
 * An datatable column.
 *
 * It represent
 *
 * See {@link DataTableComponent} for more explanation.
 */
@Component({
    selector: 'aw-dt-column',
    template: ``
})
export class DTColumnComponent implements OnInit, AfterContentInit
{

    /**
     * Label and header are the same field. However, label is a better name than header.
     * This is the field that should be used.
     */
    @Input() label: string;

    /**
     * field key in the list object passed to datatable.
     */
    @Input() field: string;

    /**
     * property to be sorted on.
     */
    @Input() sortField: string;

    /**
     * Column Label. See label.
     */
    @Input() header: string;

    /**
     * Column footer section. Appears
     */
    @Input() footer: string;

    /**
     * is column sortable?
     */
    @Input() sortable: any;

    /**
     * is column editable? Set to true if fields supports inline editing.
     */
    @Input() editable: boolean;

    /**
     * Does this column support filtering.
     */
    @Input() filter: boolean;

    /**
     * How should the values from the filter match with values from data.
     */
    @Input() filterMatchMode: string;

    @Input() filterType: string = 'text';

    /**
     * Column row span.
     */
    @Input() rowspan: number;

    /**
     * Column col span.
     */
    @Input() colspan: number;

    /**
     * Css style applied to column.
     * For example, setting column width.
     * Ex: [style]="{'width':'33%'}"
     */
    @Input() style: any;

    /**
     * Css class to be applied to column.
     */
    @Input() styleClass: string;

    /**
     * is this column hidden?
     */
    @Input() hidden: boolean;

    /**
     * Display a icon on the cells of this column that expands row when clicked.
     */
    @Input() expander: boolean;

    /**
     * Define weather it's single or multiple selection mode.
     */
    @Input() selectionMode: string;

    /**
     * filter placeholder text.
     */
    @Input() filterPlaceholder: string;

    /**
     * Whether the column is fixed in horizontal scrolling.
     */
    @Input() frozen: boolean;

    /**
     * List of templates. Currently we recognize following templates:
     *  - Header
     *  - body
     *  - footer
     *  - filter
     *  - editor
     */
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    /**
     * Editor Template. Extracted here to support whole table edit mode.
     */
    public editorTemplate: TemplateRef<any>;

    /**
     * Body template. Extracted here to support whole table edit mode.
     */
    public bodyTemplate: TemplateRef<any>;

    ngOnInit()
    {
        // Label takes precedence.
        if (isPresent(this.label)) {
            this.header = this.label;
        }

        // Do I have any styles? if not default to our standards.
        if (!isPresent(this.styleClass) && !isPresent(this.style)) {
            this.styleClass = 'dt-column-data';
        }
    }

    ngAfterContentInit(): void
    {
        // Save the templates to later use when datatable editMode changes.
        this.templates.forEach((item) =>
        {
            switch (item.getType()) {

                case 'editor':
                    this.editorTemplate = item.template;
                    break;
                case 'body':
                    this.bodyTemplate = item.template;
                    break;
            }
        });
    }

    hasTemplates(): boolean
    {
        return (this.templates && this.templates.length > 0);
    }
}
