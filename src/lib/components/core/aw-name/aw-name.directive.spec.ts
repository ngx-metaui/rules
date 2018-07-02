import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import {
    Component
} from '@angular/core';
import {
    By
} from '@angular/platform-browser';
import {
    AwNameDirective
} from './aw-name.directive';
import {
    AwNameStore
} from './aw-name.store';
import {
    AppConfig
} from '../../../core';

@Component({
    template: `
        <div class="parent-container" id="master">
            <div id="summary">
                <dl>
                    <dt>Category:</dt>
                    <dd awName ext="retail">Retail</dd>
                </dl>
            </div>
            <div>
                <form id="applicant">
                    <input type="text" name="firstName" awName>
                    <input type="text" name="lastName" awName>
                    <input type="text" name="age" awName>
                    <button name="update" (click)="updateApplicant()" awName>Submit</button>
                </form>
                <form id="spouse">
                    <input type="text" name="firstName" awName>
                    <input type="text" name="lastName" awName>
                    <input type="text" name="age" awName>
                    <button name="update" (click)="updateSpouse()" awName>Submit</button>
                </form>
                <form>
                    <input type="text" name="firstName" awName class="masterFirstName">
                    <input type="text" name="lastName" awName class="masterLastName">
                    <input type="text" name="age" awName class="masterAge">
                    <select name="province" id="us_state" awName>
                        <option value="AL" awName class="test">Alabama</option>
                        <option value="AK" awName>Alaska</option>
                        <option value="AZ" awName>Arizona</option>
                    </select>
                    <select name="city" awName>
                        <option value="Alamo" awName>Alamo</option>
                        <option value="Baltimore" awName>Baltimore</option>
                        <option value="Carson" awName>Carson</option>
                        <option value="Dover" awName>Dover</option>
                        <option value="Los Angeles" awName>Los Angeles</option>
                    </select>
                    <button name="update" (click)="updateSpouse()" awName>Submit</button>
                </form>
            </div>
            <div id="offspring">
                <div *ngFor="let child of children; let i = index"
                     (click)="editChild(child.id)" class="child" awName ext="child{{i}}">
                    <div awName ext="childName{{i}}" class="name">{{child.name}}</div>
                    <div awName ext="childAge{{i}}" class="age">{{child.age}}</div>
                    <div awName ext="childFood{{i}}" class="food">{{child.favoriteFood}}</div>
                </div>
            </div>
        </div>`
})
class AwNameTestingComponent {
    children: any[] = [{
        id: 'C01',
        name: 'Jack',
        age: 14,
        favoriteFood: 'ice cream'
    }, {
        id: 'C02',
        name: 'Sally',
        age: 12,
        favoriteFood: 'pizza'
    }, {
        id: 'C03',
        name: 'Debbie',
        age: 7,
        favoriteFood: 'salad'
    }];

    updateApplicant() {
    }

    updateSpouse() {
    }

    editChild(id: string) {
    }

}

const getAwName = (el: any) => {
    return el.attributes.awname.value;
};

const queryByAwName = (de: any, awname: string) => {
    return de.query(By.css(`[awname="${awname}"]`));
};

describe('AwNameDirective', () => {

    let component: AwNameTestingComponent;
    let fixture: ComponentFixture<AwNameTestingComponent>;
    let de: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                AwNameStore,
                {
                    provide: AppConfig, useValue: {
                        isProductionMode: () => false
                    }
                }
            ],
            declarations: [
                AwNameDirective,
                AwNameTestingComponent
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AwNameTestingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        de = fixture.debugElement;
    });

    it('should create a awname for an input element', () => {
        let el = de.query(By.css('#applicant input[name="firstName"]')).nativeElement;
        expect(getAwName(el)).toBe('applicant_input_firstName');
        el = de.query(By.css('#applicant input[name="lastName"]')).nativeElement;
        expect(getAwName(el)).toBe('applicant_input_lastName');
        el = de.query(By.css('#applicant input[name="age"]')).nativeElement;
        expect(getAwName(el)).toBe('applicant_input_age');

        expect(queryByAwName(de, 'spouse_input_firstName')).not.toBeNull();
        expect(queryByAwName(de, 'spouse_input_lastName')).not.toBeNull();
        expect(queryByAwName(de, 'spouse_input_age')).not.toBeNull();
        expect(queryByAwName(de, 'spouse_input_favoriteColor')).toBeNull();
    });

    it('should create a awname for an button element', () => {
        expect(queryByAwName(de, 'applicant_button_update')).not.toBeNull();
        expect(queryByAwName(de, 'spouse_button_update')).not.toBeNull();
    });

    it('should create a awname for other elements', () => {
        expect(queryByAwName(de, 'summary_dd_retail')).not.toBeNull();
    });

    it('should find the fist available "ancestor" id and use is as prefix for context', () => {
        expect(queryByAwName(de, 'master_input_firstName')
            .nativeElement
            .classList
            .contains('masterFirstName')).toBeTruthy();
        expect(queryByAwName(de, 'master_input_lastName')
            .nativeElement
            .classList
            .contains('masterLastName')).toBeTruthy();
        expect(queryByAwName(de, 'master_input_age')
            .nativeElement
            .classList
            .contains('masterAge')).toBeTruthy();
    });

    it('should use id property if avaialble', () => {
        expect(queryByAwName(de, 'master_select_us_state')).not.toBeNull();
    });

    it('should be able to create a awname with name extension', () => {
        const childrenNames = de.queryAll(By.css('#offspring .child .name'));
        expect(getAwName(childrenNames[0].nativeElement)).toBe('offspring_div_childName0');

        expect(queryByAwName(de, 'offspring_div_child0')).not.toBeNull();
        expect(queryByAwName(de, 'offspring_div_childName0')).not.toBeNull();
        expect(queryByAwName(de, 'offspring_div_childAge0')).not.toBeNull();
        expect(queryByAwName(de, 'offspring_div_childFood0')).not.toBeNull();

        expect(queryByAwName(de, 'offspring_div_child1')).not.toBeNull();
        expect(queryByAwName(de, 'offspring_div_childName1')).not.toBeNull();
        expect(queryByAwName(de, 'offspring_div_childAge1')).not.toBeNull();
        expect(queryByAwName(de, 'offspring_div_childFood1')).not.toBeNull();

        expect(queryByAwName(de, 'offspring_div_child2')).not.toBeNull();
        expect(queryByAwName(de, 'offspring_div_childName2')).not.toBeNull();
        expect(queryByAwName(de, 'offspring_div_childAge2')).not.toBeNull();
        expect(queryByAwName(de, 'offspring_div_childFood2')).not.toBeNull();

        expect(queryByAwName(de, 'offspring_div_childAge4')).toBeNull();
    });

    it('should add value attribute if it exists', () => {
        expect(queryByAwName(de, 'us_state_option_AK')).not.toBeNull();
        expect(queryByAwName(de, 'us_state_option_AL')).not.toBeNull();
        expect(queryByAwName(de, 'us_state_option_AZ')).not.toBeNull();
    });

    it('should include parent name/awname attribute if the tag is an option', () => {
        expect(queryByAwName(de, 'master_city_option_Alamo')).not.toBeNull();
        expect(queryByAwName(de, 'master_city_option_Baltimore')).not.toBeNull();
        expect(queryByAwName(de, 'master_city_option_Carson')).not.toBeNull();
        expect(queryByAwName(de, 'master_city_option_Los_Angeles')).not.toBeNull();
    });

});

describe('AwNameDirective in Production Mode', () => {

    let component: AwNameTestingComponent;
    let fixture: ComponentFixture<AwNameTestingComponent>;
    let de: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                AwNameStore,
                {
                    provide: AppConfig, useValue: {
                        isProductionMode: () => true
                    }
                }
            ],
            declarations: [
                AwNameDirective,
                AwNameTestingComponent
            ]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AwNameTestingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        de = fixture.debugElement;
    });

    it('should NOT create a awname for an input element', () => {
        let el = de.query(By.css('#applicant input[name="firstName"]')).nativeElement;
        expect(getAwName(el)).toBe('');
        el = de.query(By.css('#applicant input[name="lastName"]')).nativeElement;
        expect(getAwName(el)).toBe('');
    });
});
