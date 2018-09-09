/**
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
 * Based on original work: MetaUI: Craig Federighi (2008)
 *
 */
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '@aribaui/core';
/**
 * MetaContentPage  component is used from MetaRules and universal component rendering different
 * operation modes.
 *
 *
 */
export declare class MetaContentPageComponent implements OnInit {
    private route;
    private routingService;
    object: any;
    operation: string;
    layout: string;
    newContext: boolean;
    objectName: string;
    isInspectAction: boolean;
    okLabel: string;
    constructor(route: ActivatedRoute, routingService: RoutingService);
    ngOnInit(): void;
    onBack(event: any): void;
}
