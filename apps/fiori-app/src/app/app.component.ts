import {Component} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Money, SelectItem} from '@ngx-metaui/fiori-rules';

@Component({
  selector: 'ngx-metaui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fiori-app';
  form: FormGroup;
  private validators: ValidatorFn[];

  colors = ['blue', 'green', 'red'];
  cbList = ['Apple',
    'Pineapple',
    'Banana',
    'Kiwi',
    'Strawberry',

    'Pineapple1',
    'Banana1',
    'Kiwi1',
    'Strawberry1',

    'Pineapple2',
    'Banana2',
    'Kiwi2',
    'Strawberry2',

    'Pineapple3',
    'Banana3',
    'Kiwi3',
    'Strawberry3',

    'Pineapple4',
    'Banana4',
    'Kiwi4',
    'Strawberry4',

    'Pineapple5',
    'Banana5',
    'Kiwi5',
    'Strawberry5',

    'Pineapple56',
    'Banana6',
    'Kiwi6',
    'Strawberry6',

    'Pineapple7',
    'Banana7',
    'Kiwi7',
    'Strawberry7'


  ];
  cb2List = [];
  locations: Array<SelectItem> = [];
  topings: Array<SelectItem> = [];

  cbValue: any;

  data: SomeObject;
  amount: Money = new Money(325);

  constructor() {

    this.form = new FormGroup({});
    const o = [];
    o.push(new SupplierLocation('123', 'Palo Alto', 'asdfasfd'));
    o.push(new SupplierLocation('12443', 'Prague', 'asdfasfd'));
    o.push(new SupplierLocation('2222', 'Bangalor', 'asdfasfd'));

    this.locations = o.map((item: SupplierLocation) => {
        return {
          label: item.name,
          disabled: false,
          value: item

        };
      }
    );
    this.validators = [
      Validators.maxLength(10)];

    this.topings = [new Topings('aa', 'Tomatos'),
      new Topings('bb', 'Blueberries'),
      new Topings('cc', 'Ketchup')].map((item: Topings) => {
        return {
          label: item.name,
          disabled: false,
          value: item
        };
      }
    );
    const checkRequired: ValidatorFn = (control: FormControl): ValidationErrors | null => {
      const val = control.value;
      return !val || val.length ? {'sssssss': true} : null;
    };

    this.data = new SomeObject('Fred', '3420 Hills View, Palo Alto',
      'ariba@sap.com', 'blue', o[1], true,
      'Flinstone', 123, 'A123-11', new Date(2019, 11, 3),
      [new Topings('aa', 'Tomatos')], 'xx',
      new Supplier('sid4', 'brellaBox'),
      new Money(250));


    for (let i = 0; i < companies.length; i++) {

      this.cb2List.push(new Supplier('sid' + i, companies[i]['company_name']));
    }
  }

  onclick(event: any) {
    alert('aaa');
  }
}

class SomeObject {
  constructor(public firstName: string,
              public address: string,
              public email: string,
              public color: string,
              public location: SupplierLocation,
              public userConfirmation: boolean,
              public lastName: string,
              public age: number,
              public accInfo: string,
              public startDate: Date,
              public topings: Array<Topings>,
              public description: string,
              public supplier: Supplier,
              public amount: Money) {
  }
}

class SupplierLocation {
  constructor(public id: string, public name: string, public descriptin: string) {
  }
}


class Topings {
  constructor(public id: string, public name: string) {
  }
}


class Supplier {
  constructor(public id: string, public name: string, public contact?: string) {
  }
}


const companies = [{
  'company_name': 'Document Prep-Program',
  'address': ' - ',
  'address2': ' - ',
  'city': ' - '
}
  , {
    'company_name': 'More than just Figleaves',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': '#Fit4ME', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'brellaBox',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'wichcraft',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': '(GFree)dom', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': '0s&1s Novels',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': '1 Knickerbocker',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': '1 Main Street Capital',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': '10 Speed Labs',
    'address': '1239 Broadway',
    'address2': 'Penthouse',
    'city': 'New York',
    'postcode': '10001',
    'borough': 'MANHATTAN',
    'latitude': '40.747135',
    'longitude': '-73.988397',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '76',
    'bin': '1082273',
    'bbl': '1008320001',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': '1000|MUSEUMS, Inc',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': '107 Models', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': '10Lines', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': '10gen', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': '11 Picas', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': '144 Investments',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': '1754 & Company, LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': '1800Postcards.com',
    'address': '121 Varick Street',
    'address2': '4th Floor',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.724861',
    'longitude': '-74.005946',
    'community_board': '2',
    'council_district': '3',
    'census_tract': '37',
    'bin': '1009728',
    'bbl': '1005780067',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': '1800TAXISTA.COM INC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': '18faubourg by Scharly Designer Studio',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': '1938 News',
    'address': '1 Astor Pl',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10003',
    'borough': 'MANHATTAN',
    'latitude': '40.730054',
    'longitude': '-73.992629',
    'community_board': '2',
    'council_district': '2',
    'census_tract': '57',
    'bin': '1008806',
    'bbl': '1005450059',
    'nta': 'West Village                                                               '
  }
  , {
    'company_name': '1DocWay',
    'address': '483 Broadway, Floor 2, New York, NY 10013',
    'address2': '483 Broadway, Floor 2',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.721543',
    'longitude': '-74.000076',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '47',
    'bin': '1007048',
    'bbl': '1004740030',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': '1NEEDS1 LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': '1Stop Energies',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': '1World New York',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': '1er Nivel S.A.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': '1stTheBest Inc',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': '1stdibs.com',
    'address': '51 Astor Place',
    'address2': 'Third Floor',
    'city': 'New York',
    'postcode': '10003',
    'borough': 'MANHATTAN',
    'latitude': '40.730183',
    'longitude': '-73.99046',
    'community_board': '3',
    'council_district': '2',
    'census_tract': '42',
    'bin': '1089443',
    'bbl': '1005540035',
    'nta': 'East Village                                                               '
  }
  , {
    'company_name': '20x200',
    'address': '6 Spring Street',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10012',
    'borough': 'MANHATTAN',
    'latitude': '40.721104',
    'longitude': '-73.994224',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '41',
    'bin': '1007140',
    'bbl': '1004780021',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': '24eight, LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': '24symbols',
    'address': '42 West 24th Street ',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.74276',
    'longitude': '-73.990437',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '58',
    'bin': '1015587',
    'bbl': '1008250071',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {'company_name': '27 Perry', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': '29th Street Publishing',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': '2Cred', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': '2J2L', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': '2U (aka 2tor)',
    'address': '60 Chelsea Piers, Suite 6020',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10011',
    'borough': 'MANHATTAN',
    'latitude': '40.747999',
    'longitude': '-74.008496',
    'community_board': '4',
    'council_district': '3',
    'census_tract': '99',
    'bin': '1012256',
    'bbl': '1006620011',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': '2findLocal',
    'address': '2637 E 27th St',
    'address2': ' - ',
    'city': 'New York'
  }
  , {
    'company_name': '2nd Nature Toys',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': '303 Network, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': 'New York'
  }
  , {
    'company_name': '33across',
    'address': '229 West 28th Street, 12th Fl',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10001',
    'borough': 'MANHATTAN',
    'latitude': '40.747665',
    'longitude': '-73.994348',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '95',
    'bin': '1014255',
    'bbl': '1007780020',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': '345 Design',
    'address': '49 Greenwich Ave, Suite 2',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10014',
    'borough': 'MANHATTAN',
    'latitude': '40.735668',
    'longitude': '-74.000581',
    'community_board': '2',
    'council_district': '3',
    'census_tract': '71',
    'bin': '1010893',
    'bbl': '1006120060',
    'nta': 'West Village                                                               '
  }
  , {
    'company_name': 'A.R.T.S.Y Magazine',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': '360VIDY',
    'address': '50 Greene Avenue',
    'address2': ' - ',
    'city': 'Brooklyn',
    'postcode': '11238',
    'borough': 'BROOKLYN ',
    'latitude': '40.686143',
    'longitude': '-73.970678',
    'community_board': '2',
    'council_district': '35',
    'census_tract': '179',
    'bin': '3055849',
    'bbl': '3019570030',
    'nta': 'Fort Greene                                                                '
  }
  , {
    'company_name': '360i',
    'address': '32 Avenue of the Americas',
    'address2': '6th Floor',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.72008',
    'longitude': '-74.005184',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '33',
    'bin': '1002192',
    'bbl': '1001920001',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {'company_name': '3FLOZ, LLC', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': '3Floz.com',
    'address': '100 John St Suite 1601',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10038',
    'borough': 'MANHATTAN',
    'latitude': '40.707984',
    'longitude': '-74.006164',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '1502',
    'bin': '1001127',
    'bbl': '1000697502',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {
    'company_name': '3P Partners, Inc',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': '3S Pharmacy',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': '3Top',
    'address': '55 Broad St.',
    'address2': '15th Floor',
    'city': 'New York',
    'postcode': '10004',
    'borough': 'MANHATTAN',
    'latitude': '40.705189',
    'longitude': '-74.011505',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '9',
    'bin': '1000821',
    'bbl': '1000250001',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {'company_name': '3doo Inc', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': '4 Play', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': '420 Spirits Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': '42stats', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'AJM Inc.', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'AJR Business Solutions Inc',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': '4C Insight (The Echo System)',
    'address': '1133 Broadway',
    'address2': 'Suite 1420',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.743523',
    'longitude': '-73.989073',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '58',
    'bin': '1015625',
    'bbl': '1008270049',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': '4Front Partners Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': '4GQR Ventures LLC dba PhotoQR.com',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': '4URSPACE', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': '4f tech, LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': '5 Oclock Records',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': '5ivepoints', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': '6-ocean', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': '675 Beech, LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': '680 Partners LLC',
    'address': '680 5th Avenue, 10th Floor',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10019',
    'borough': 'MANHATTAN',
    'latitude': '40.760703',
    'longitude': '-73.975634',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '104',
    'bin': '1034532',
    'bbl': '1012690041',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {'company_name': '72Lux', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': '72looks', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': '789 Group', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': '8 Path Solutions LLC', 'address': '226 W 78TH ST #2A'}
  , {
    'company_name': 'New York, NY 10024',
    'address': '226 W 78TH ST #2A',
    'address2': 'New York',
    'city': 'http://www.8pathsolutions.com/'
  }
  , {
    'company_name': '86shifts.com',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': '87AM',
    'address': '61 Broadway',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10006',
    'borough': 'MANHATTAN',
    'latitude': '40.706995',
    'longitude': '-74.012335',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '13',
    'bin': '1000808',
    'bbl': '1000210001',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {
    'company_name': '89 Second Productions',
    'address': '1727 2nd Ave Apt 4FN',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10128',
    'borough': 'MANHATTAN',
    'latitude': '40.780056',
    'longitude': '-73.950171',
    'community_board': '8',
    'council_district': '5',
    'census_tract': '154',
    'bin': '1048892',
    'bbl': '1015350022',
    'nta': 'Yorkville                                                                  '
  }
  , {
    'company_name': '8coupons',
    'address': '116 W. 23rd St.',
    'address2': '5th floor',
    'city': 'New York',
    'postcode': '10011',
    'borough': 'MANHATTAN',
    'latitude': '40.743218',
    'longitude': '-73.993562',
    'community_board': '4',
    'council_district': '3',
    'census_tract': '91',
    'bin': '1014802',
    'bbl': '1007980041',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': '911 Cancer Fund',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': '9branding',
    'address': '419 lafayette street, 2nd floor',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10003',
    'borough': 'MANHATTAN',
    'latitude': '40.728789',
    'longitude': '-73.992344',
    'community_board': '2',
    'council_district': '2',
    'census_tract': '57',
    'bin': '1008773',
    'bbl': '1005440013',
    'nta': 'West Village                                                               '
  }
  , {
    'company_name': '9mmedia',
    'address': '627 Broadway',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10012',
    'borough': 'MANHATTAN',
    'latitude': '40.726058',
    'longitude': '-73.996255',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '5501',
    'bin': '1008237',
    'bbl': '1005230044',
    'nta': 'West Village                                                               '
  }
  , {
    'company_name': '@60 - The Height of Art',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': '@Gallery', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'A New Life In',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'A Perfume Organic',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'A Tribe Called Love',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'A V Therapeutics, inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'A&B American Style',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'A.H. COLLECTIBLES',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'A022 Digital',
    'address': '181 York St 5B',
    'address2': ' - ',
    'city': 'Brooklyn',
    'postcode': '11201',
    'borough': 'BROOKLYN ',
    'latitude': '40.701406',
    'longitude': '-73.983767',
    'community_board': '2',
    'council_district': '33',
    'census_tract': '21',
    'bin': '3398669',
    'bbl': '3000550045',
    'nta': 'DUMBO-Vinegar Hill-Downtown Brooklyn-Boerum Hill                           '
  }
  , {
    'company_name': 'ABACEO, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'ABLE Social',
    'address': '305 W 87th st',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10024',
    'borough': 'MANHATTAN',
    'latitude': '40.789753',
    'longitude': '-73.977801',
    'community_board': '7',
    'council_district': '6',
    'census_tract': '175',
    'bin': '1033999',
    'bbl': '1012490127',
    'nta': 'Upper West Side                                                            '
  }
  , {
    'company_name': 'AC Lion',
    'address': '253 West 35th Street',
    'address2': '15th Floor',
    'city': 'New York',
    'postcode': '10001',
    'borough': 'MANHATTAN',
    'latitude': '40.752289',
    'longitude': '-73.991612',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '109',
    'bin': '1014423',
    'bbl': '1007850011',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': 'AC Rattling',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'ACCOMPANY', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'ACE Group',
    'address': '711 Third Avenue',
    'address2': '16th Floor',
    'city': 'New York',
    'postcode': '10017',
    'borough': 'MANHATTAN',
    'latitude': '40.752374',
    'longitude': '-73.973266',
    'community_board': '6',
    'council_district': '4',
    'census_tract': '90',
    'bin': '1037568',
    'bbl': '1013180001',
    'nta': 'Turtle Bay-East Midtown                                                    '
  }
  , {
    'company_name': 'ACE Innovative Networks',
    'address': '277 Broadway',
    'address2': '807',
    'city': 'New York',
    'postcode': '10007',
    'borough': 'MANHATTAN',
    'latitude': '40.714349',
    'longitude': '-74.006172',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '21',
    'bin': '1001635',
    'bbl': '1001490033',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'ACE Portal Group',
    'address': '711 Third Avenue',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10017',
    'borough': 'MANHATTAN',
    'latitude': '40.752374',
    'longitude': '-73.973266',
    'community_board': '6',
    'council_district': '4',
    'census_tract': '90',
    'bin': '1037568',
    'bbl': '1013180001',
    'nta': 'Turtle Bay-East Midtown                                                    '
  }
  , {'company_name': 'ACTIVITO', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'AD60',
    'address': '68 Jay Street ',
    'address2': 'Unit 616',
    'city': 'Brooklyn',
    'postcode': '11201',
    'borough': 'BROOKLYN ',
    'latitude': '40.702763',
    'longitude': '-73.986681',
    'community_board': '2',
    'council_district': '33',
    'census_tract': '21',
    'bin': '3000090',
    'bbl': '3000400001',
    'nta': 'DUMBO-Vinegar Hill-Downtown Brooklyn-Boerum Hill                           '
  }
  , {'company_name': 'ADANSALON', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'ADORNIA', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'ADRailUSA', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'ADstruc',
    'address': '241 Centre Street',
    'address2': '7th Floor',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.720234',
    'longitude': '-73.998167',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '45',
    'bin': '1007005',
    'bbl': '1004720019',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'AF Productions',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'AG Resume Revisions',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'AGORIQUE', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'AHALife',
    'address': '45 Bond St.',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10012',
    'borough': 'MANHATTAN',
    'latitude': '40.726058',
    'longitude': '-73.992947',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '5502',
    'bin': '1008433',
    'bbl': '1005290031',
    'nta': 'West Village                                                               '
  }
  , {
    'company_name': 'AIDS Ride South Africa',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'AIQ, Inc.', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'AIR-BRAIN', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Fituoso', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'AKQA',
    'address': '175 Varick St.',
    'address2': '10th Floor',
    'city': 'New York',
    'postcode': '10014',
    'borough': 'MANHATTAN',
    'latitude': '40.727392',
    'longitude': '-74.005517',
    'community_board': '2',
    'council_district': '3',
    'census_tract': '37',
    'bin': '1009754',
    'bbl': '1005800065',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'ALFY, Inc.',
    'address': '589 Eighth Avenue',
    'address2': '20th Floor',
    'city': 'New York',
    'postcode': '10018',
    'borough': 'MANHATTAN',
    'latitude': '40.755155',
    'longitude': '-73.991319',
    'community_board': '4',
    'council_district': '3',
    'census_tract': '115',
    'bin': '1013646',
    'bbl': '1007620042',
    'nta': 'Clinton                                                                    '
  }
  , {
    'company_name': 'ALTANOVA Energy+Sustainability',
    'address': '11-05 44th Dr',
    'address2': ' - ',
    'city': 'Long Island City',
    'postcode': '11101',
    'borough': 'QUEENS   ',
    'latitude': '40.748483',
    'longitude': '-73.949285',
    'community_board': '2',
    'council_district': '26',
    'census_tract': '19',
    'bin': '4005233',
    'bbl': '4004470021',
    'nta': 'Hunters Point-Sunnyside-West Maspeth                                       '
  }
  , {
    'company_name': 'AMA Animal Rescue',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'AOL',
    'address': '770 Broadway, New York, NY 10003',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'APDS', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'API Fortress',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'APP âˆšâ€  GOGO',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'ARI DEIN LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'ARTSTRAK', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'ARTstor',
    'address': '151 East 61st Street',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10065',
    'borough': 'MANHATTAN',
    'latitude': '40.763305',
    'longitude': '-73.966836',
    'community_board': '8',
    'council_district': '4',
    'census_tract': '11402',
    'bin': '1041980',
    'bbl': '1013960025',
    'nta': 'Upper East Side-Carnegie Hill                                              '
  }
  , {
    'company_name': 'ASAP Property Management',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'ASM Global Ventures',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'ASPECD Apparel',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'ASTORIA FILMS',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'ATMG (All Things Marvin Gaye)',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'AUDUBON',
    'address': '3960 Broadway',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10032',
    'borough': 'MANHATTAN',
    'latitude': '40.83976',
    'longitude': '-73.940705',
    'community_board': '12',
    'council_district': '10',
    'census_tract': '251',
    'bin': '1062993',
    'bbl': '1021240043',
    'nta': 'Washington Heights South                                                   '
  }
  , {
    'company_name': 'AW Healthcare Management, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'AaronDFashionGroup Inc',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Abacus',
    'address': '39 E 20th St',
    'address2': 'Fl 4',
    'city': 'New York',
    'postcode': '10003',
    'borough': 'MANHATTAN',
    'latitude': '40.738895',
    'longitude': '-73.989081',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '52',
    'bin': '1016228',
    'bbl': '1008497501',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {'company_name': 'AbbeyPost', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Abilitycapitalcredit',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Able Made', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Able Markets',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'About.com',
    'address': '1500 Broadway, 6th Floor, New York, NY 10016',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'AbridgeME',
    'address': '457 W 17th St',
    'address2': '11',
    'city': 'New York',
    'postcode': '10011',
    'borough': 'MANHATTAN',
    'latitude': '40.743742',
    'longitude': '-74.006027',
    'community_board': '4',
    'council_district': '3',
    'census_tract': '83',
    'bin': '1012545',
    'bbl': '1007150001',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {'company_name': 'Absent Cam', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Abwop.com', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Acadaca',
    'address': '636 Broadway #516',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10012',
    'borough': 'MANHATTAN',
    'latitude': '40.726247',
    'longitude': '-73.996067',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '5502',
    'bin': '1008213',
    'bbl': '1005220012',
    'nta': 'West Village                                                               '
  }
  , {
    'company_name': 'AcceleWeb, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Acceleron Digital',
    'address': '131 Varick St #917',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.725397',
    'longitude': '-74.005841',
    'community_board': '2',
    'council_district': '3',
    'census_tract': '37',
    'bin': '1009740',
    'bbl': '1005790030',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Accent Internet Group',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Accenture',
    'address': '1345 Avenue of the Americas, New York, NY 10105',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10105',
    'borough': 'MANHATTAN',
    'latitude': '40.762605',
    'longitude': '-73.97846',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '137',
    'bin': '1083719',
    'bbl': '1010070029',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {'company_name': 'Accern', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Accomplsh', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Accretive technologies',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Acme Railways',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Acorn', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Acquaintable',
    'address': ' - ',
    'address2': ' - ',
    'city': 'New York'
  }
  , {
    'company_name': 'Acquity Group (acquired by Accenture)',
    'address': '636 6th Ave Suite 300',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10011',
    'borough': 'MANHATTAN',
    'latitude': '40.740567',
    'longitude': '-73.99449',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '54',
    'bin': '1015460',
    'bbl': '1008217506',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Action Enable Networks',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Activation, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Activore', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'ActorPerks', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'ActvContent',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Ad Nibble', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'AdColony',
    'address': '175 Varick',
    'address2': ' - ',
    'city': 'New York'
  }
  , {
    'company_name': 'AdRadar',
    'address': '252 West 37th Street',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10018',
    'borough': 'MANHATTAN',
    'latitude': '40.753514',
    'longitude': '-73.990728',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '109',
    'bin': '1014452',
    'bbl': '1007860076',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': 'AdStack [acquired by TellApart]',
    'address': '155 Water Street /257 Myrtle Road'
  }
  , {
    'company_name': 'Burlingame, CA 94010',
    'address': '2',
    'address2': 'Brooklyn',
    'city': 'http://adstack.com/ http://www.tellapart.com/company/'
  }
  , {
    'company_name': 'AdTheorent',
    'address': '155 Avenue of the Americas',
    'address2': '2nd Floor',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.725248',
    'longitude': '-74.004412',
    'community_board': '2',
    'council_district': '3',
    'census_tract': '37',
    'bin': '1007385',
    'bbl': '1004910046',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Adafruit',
    'address': '150 Varick St, New York, NY, 10013',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Adam & Luna',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Aviary',
    'address': '243 W 30th',
    'address2': 'St #11',
    'city': 'New York'
  }
  , {
    'company_name': 'Adaptly',
    'address': '22 West 19th Street',
    'address2': '3rd Floor',
    'city': 'New York',
    'postcode': '10011',
    'borough': 'MANHATTAN',
    'latitude': '40.73948',
    'longitude': '-73.992332',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '54',
    'bin': '1015446',
    'bbl': '1008200026',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {'company_name': 'Adcade', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Adcomm Mobile',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'AddMee', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Adhara', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Adkeeper',
    'address': '381 Park Avenue South',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10016',
    'borough': 'MANHATTAN',
    'latitude': '40.742534',
    'longitude': '-73.984641',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '68',
    'bin': '1018159',
    'bbl': '1008820085',
    'nta': 'Gramercy                                                                   '
  }
  , {
    'company_name': 'Adkins Capital Management, LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Admeld',
    'address': 'One Madison Ave',
    'address2': '4th Floor',
    'city': 'New York'
  }
  , {
    'company_name': 'Admission Advantage',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'AdmitSee', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Admittedly', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Adore Me',
    'address': '485 7th Ave #505',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10018',
    'borough': 'MANHATTAN',
    'latitude': '40.752465',
    'longitude': '-73.989544',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '109',
    'bin': '1015235',
    'bbl': '1008127501',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {'company_name': 'AdoreMe', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Adprime Media',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Adtivity by Appssavvy',
    'address': '594 Broadway',
    'address2': 'Suite 207',
    'city': 'New York',
    'postcode': '10012',
    'borough': 'MANHATTAN',
    'latitude': '40.72496',
    'longitude': '-73.997157',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '43',
    'bin': '1007944',
    'bbl': '1005110012',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {'company_name': 'Adventr', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Advicedrop', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Advise.me', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Advus', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Advyzr',
    'address': '119 west 31st street',
    'address2': '4th Floor',
    'city': 'New York',
    'postcode': '10001',
    'borough': 'MANHATTAN',
    'latitude': '40.748238',
    'longitude': '-73.989952',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '101',
    'bin': '1015181',
    'bbl': '1008070028',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {'company_name': 'Advyzr', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Adweek',
    'address': '770 Broadway',
    'address2': '7th floor',
    'city': 'New York',
    'postcode': '10003',
    'borough': 'MANHATTAN',
    'latitude': '40.730842',
    'longitude': '-73.991402',
    'community_board': '2',
    'council_district': '2',
    'census_tract': '57',
    'bin': '1008952',
    'bbl': '1005540001',
    'nta': 'West Village                                                               '
  }
  , {
    'company_name': 'Adz Anywhere',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Aereo, Inc.',
    'address': '37-18 Northern Boulevard',
    'address2': ' - ',
    'city': 'Long Island City',
    'postcode': '11101',
    'borough': 'QUEENS   ',
    'latitude': '40.752096',
    'longitude': '-73.925887',
    'community_board': '1',
    'council_district': '26',
    'census_tract': '171',
    'bin': '4003103',
    'bbl': '4002140040',
    'nta': 'Hunters Point-Sunnyside-West Maspeth                                       '
  }
  , {
    'company_name': 'AetherWorks',
    'address': '501 Fifth Avenue',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10017',
    'borough': 'MANHATTAN',
    'latitude': '40.753315',
    'longitude': '-73.980993',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '82',
    'bin': '1035342',
    'bbl': '1012760069',
    'nta': 'Murray Hill-Kips Bay                                                       '
  }
  , {'company_name': 'Aethertech', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Affinity', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Africa Plateforme',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Afromedia News Corps',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'AfterSteps_ny',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'AfterYes', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'AgFunder', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Agape Academy',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Agent Link', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Aggregift', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Agilitus',
    'address': '350 Manhattan Avenue',
    'address2': ' - ',
    'city': 'Brooklyn',
    'postcode': '11211',
    'borough': 'BROOKLYN ',
    'latitude': '40.71595',
    'longitude': '-73.94632',
    'community_board': '1',
    'council_district': '34',
    'census_tract': '497',
    'bin': '3068433',
    'bbl': '3027490001',
    'nta': 'East Williamsburg                                                          '
  }
  , {
    'company_name': 'Aging2.0',
    'address': ' - ',
    'address2': ' - ',
    'city': 'New York'
  }
  , {'company_name': 'Agolo', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Agon Creative',
    'address': '538 Grand St',
    'address2': '2nd Floor',
    'city': 'Brooklyn',
    'postcode': '11211',
    'borough': 'BROOKLYN ',
    'latitude': '40.711055',
    'longitude': '-73.949981',
    'community_board': '1',
    'council_district': '34',
    'census_tract': '513',
    'bin': '3069501',
    'bbl': '3027850018',
    'nta': 'North Side-South Side                                                      '
  }
  , {
    'company_name': 'AgooBiz, Inc [AgooBiz.com]',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Agronomic Technology Corp.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Agyx',
    'address': '110 Wall Street',
    'address2': '11 Floor',
    'city': 'New York',
    'postcode': '10005',
    'borough': 'MANHATTAN',
    'latitude': '40.704638',
    'longitude': '-74.006694',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '7',
    'bin': '1000872',
    'bbl': '1000370008',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {'company_name': 'Ahhdio', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Ahii: Another story about a girl...',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Applied Science & Technology Research Organization',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Ai Media Group',
    'address': '483 10th Avenue',
    'address2': '4th Floor',
    'city': 'New York',
    'postcode': '10018',
    'borough': 'MANHATTAN',
    'latitude': '40.756401',
    'longitude': '-73.997834',
    'community_board': '4',
    'council_district': '3',
    'census_tract': '99',
    'bin': '1012494',
    'bbl': '1007080037',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {'company_name': 'Aidin', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'AirBnB', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'AirKast',
    'address': '610 Fifth Avenue',
    'address2': 'Suite 610',
    'city': 'New York',
    'postcode': '10020',
    'borough': 'MANHATTAN',
    'latitude': '40.75801',
    'longitude': '-73.977595',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '104',
    'bin': '1082656',
    'bbl': '1012650050',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {'company_name': 'Airto', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Airto Inc', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Aisle in Style',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Ajungo.com', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Akamai Technologies',
    'address': '352 Park Avenue South',
    'address2': '8th Floor',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.74176',
    'longitude': '-73.98523',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '56',
    'bin': '1016745',
    'bbl': '1008550016',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {'company_name': 'Akilah', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Akimbo', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Aksel Group, Inc',
    'address': '52 Walker Street 3rd Floor',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.71899',
    'longitude': '-74.003308',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '33',
    'bin': '1002287',
    'bbl': '1001940005',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {'company_name': 'Akyumen', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Alacra Inc',
    'address': '100 Broadway',
    'address2': '#1101',
    'city': 'New York',
    'postcode': '10005',
    'borough': 'MANHATTAN',
    'latitude': '40.70814',
    'longitude': '-74.011373',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '7',
    'bin': '1001024',
    'bbl': '1000460003',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {
    'company_name': 'Albatross Digital, LLC',
    'address': '155 Water Street',
    'address2': ' - ',
    'city': 'Brooklyn',
    'postcode': '11201',
    'borough': 'BROOKLYN ',
    'latitude': '40.703147',
    'longitude': '-73.987864',
    'community_board': '2',
    'council_district': '33',
    'census_tract': '21',
    'bin': '3000026',
    'bbl': '3000290016',
    'nta': 'DUMBO-Vinegar Hill-Downtown Brooklyn-Boerum Hill                           '
  }
  , {
    'company_name': 'Albert Herrera',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Alchematter',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Alchemy50',
    'address': '20 Jay Street',
    'address2': 'Suite 934',
    'city': 'Brooklyn',
    'postcode': '11201',
    'borough': 'BROOKLYN ',
    'latitude': '40.704313',
    'longitude': '-73.986587',
    'community_board': '2',
    'council_district': '33',
    'census_tract': '21',
    'bin': '3000010',
    'bbl': '3000190001',
    'nta': 'DUMBO-Vinegar Hill-Downtown Brooklyn-Boerum Hill                           '
  }
  , {'company_name': 'Alcohoot', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Alcohoot LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Alexander Berardi',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'AlgoPrice', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Align Communications, Inc.',
    'address': '55 Broad Street',
    'address2': '6th Floor',
    'city': 'New York',
    'postcode': '10004',
    'borough': 'MANHATTAN',
    'latitude': '40.705189',
    'longitude': '-74.011505',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '9',
    'bin': '1000821',
    'bbl': '1000250001',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {
    'company_name': 'All Veggiez!',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'All You Need Staffing Registry',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'AllOut.org',
    'address': ' - ',
    'address2': ' - ',
    'city': 'New York'
  }
  , {
    'company_name': 'AllStar Deals, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'AllTheRooms',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Alla Simoneaus Company',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'AllazoHealth',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Alley Interactive',
    'address': '1133 Broadway',
    'address2': 'Suite 630',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.743523',
    'longitude': '-73.989073',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '58',
    'bin': '1015625',
    'bbl': '1008270049',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Alley Technology',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'AlleyWatch', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'AlleyWire', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Allmenus',
    'address': '39 West 19th Street',
    'address2': '7th Floor',
    'city': 'New York',
    'postcode': '10011',
    'borough': 'MANHATTAN',
    'latitude': '40.739666',
    'longitude': '-73.992725',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '54',
    'bin': '1015465',
    'bbl': '1008210014',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Allovate, LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Alloy Digital',
    'address': '151 West 26th Street',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10001',
    'borough': 'MANHATTAN',
    'latitude': '40.745428',
    'longitude': '-73.992872',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '95',
    'bin': '1015034',
    'bbl': '1008020008',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': 'Alluring Logic',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Allyson Ivy',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Alpha Airlines',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Alpha Hat', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'AlphaBoost (AdVerify)',
    'address': '122 West 26th Street',
    'address2': '5th Floor',
    'city': 'New York',
    'postcode': '10001',
    'borough': 'MANHATTAN',
    'latitude': '40.745164',
    'longitude': '-73.992295',
    'community_board': '4',
    'council_district': '3',
    'census_tract': '91',
    'bin': '1015021',
    'bbl': '1008010055',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'AlphaIntelX',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'AlphaSights',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Alquimi Innovations, LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Alset', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Altah',
    'address': '1412 Broadway, 22nd Fl',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10018',
    'borough': 'MANHATTAN',
    'latitude': '40.753711',
    'longitude': '-73.987046',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '113',
    'bin': '1080611',
    'bbl': '1008150014',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {'company_name': 'Alton Lane', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Altruik',
    'address': '341 West 38th Street',
    'address2': '8th Floor',
    'city': 'New York',
    'postcode': '10018',
    'borough': 'MANHATTAN',
    'latitude': '40.755237',
    'longitude': '-73.992864',
    'community_board': '4',
    'council_district': '3',
    'census_tract': '115',
    'bin': '1013637',
    'bbl': '1007620011',
    'nta': 'Clinton                                                                    '
  }
  , {'company_name': 'AlumVest', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'AlumniChoose',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Alvadon', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Amasty', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Amazon Web Services',
    'address': '1350 Avenue of Americas, New York, NY, 10019',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Ambertracks Technology Inc.  DBA: Monstress Zenergy Drink',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Ambigâˆšâˆ« Empanada Bar',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Amer Pharmacy Corp.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'AmerIsrael Capital Management, LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Americas Amazing Teens, LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Americas Amazing Teensâ€šÃ‘Â¢',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'American Capital Group',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'American Civics Exchange',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'American Lawyer Media',
    'address': '120 Broadway',
    'address2': '5th Floor',
    'city': 'New York',
    'postcode': '10271',
    'borough': 'MANHATTAN',
    'latitude': '40.708546',
    'longitude': '-74.011041',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '7',
    'bin': '1001026',
    'bbl': '1000477501',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {
    'company_name': 'American Prison Data Systems, PBC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'American Story Channel LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'American Woman Publishing LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Avua Cachaca',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Awar3', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Amerikids',
    'address': '10 Leonard Street Loft 3SW',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.718798',
    'longitude': '-74.008254',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '33',
    'bin': '1001995',
    'bbl': '1001790021',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Ammirati',
    'address': '19 Union Square W',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10003',
    'borough': 'MANHATTAN',
    'latitude': '40.736065',
    'longitude': '-73.991098',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '52',
    'bin': '1016074',
    'bbl': '1008430020',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Amo Beverage Group',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Amorphyk', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Amplify Education, Inc.',
    'address': '55 Washington St',
    'address2': '#900',
    'city': 'Brooklyn',
    'postcode': '11201',
    'borough': 'BROOKLYN ',
    'latitude': '40.70273',
    'longitude': '-73.989602',
    'community_board': '2',
    'council_district': '33',
    'census_tract': '21',
    'bin': '3000088',
    'bbl': '3000380001',
    'nta': 'DUMBO-Vinegar Hill-Downtown Brooklyn-Boerum Hill                           '
  }
  , {
    'company_name': 'Amusemi.com',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Amusology',
    'address': '217 East 29th Street, APT 1B',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10016',
    'borough': 'MANHATTAN',
    'latitude': '40.742347',
    'longitude': '-73.979813',
    'community_board': '6',
    'council_district': '2',
    'census_tract': '70',
    'bin': '1019922',
    'bbl': '1009100013',
    'nta': 'Murray Hill-Kips Bay                                                       '
  }
  , {'company_name': 'Amusology', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Anait Bian LCC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'AnalytixInsight Inc',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Andras Fenyves',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Andrews Roadmaps',
    'address': 'Brooklyn',
    'address2': ' - ',
    'city': 'New York'
  }
  , {
    'company_name': 'Angel-Tel   (Intl Telephony & Mobile VoIP)',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Lingy', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Angry Villagers',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Aniepo', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Anime Feast',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Applique', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Animoto',
    'address': '440 Lafayette St.',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10003',
    'borough': 'MANHATTAN',
    'latitude': '40.729327',
    'longitude': '-73.991907',
    'community_board': '2',
    'council_district': '2',
    'census_tract': '57',
    'bin': '1088676',
    'bbl': '1005450026',
    'nta': 'West Village                                                               '
  }
  , {
    'company_name': 'Annalect',
    'address': '195 Broadway',
    'address2': '19th Flr',
    'city': 'New York',
    'postcode': '10007',
    'borough': 'MANHATTAN',
    'latitude': '40.710536',
    'longitude': '-74.009378',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '13',
    'bin': '1001227',
    'bbl': '1000800001',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {'company_name': 'Annotary', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'AnonymAsk', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Antarctic Creative',
    'address': '122 Norfolk Street',
    'address2': 'Studio 20',
    'city': 'New York',
    'postcode': '10002',
    'borough': 'MANHATTAN',
    'latitude': '40.71927',
    'longitude': '-73.986898',
    'community_board': '3',
    'council_district': '1',
    'census_tract': '1402',
    'bin': '1004302',
    'bbl': '1003530057',
    'nta': 'Lower East Side                                                            '
  }
  , {
    'company_name': 'Anvil+Gear',
    'address': '175 Varick St.',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10014',
    'borough': 'MANHATTAN',
    'latitude': '40.727392',
    'longitude': '-74.005517',
    'community_board': '2',
    'council_district': '3',
    'census_tract': '37',
    'bin': '1009754',
    'bbl': '1005800065',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Any One Color',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'AnySizeDeals',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Anyone Want To',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Apartable',
    'address': '222 Broadway',
    'address2': '20th Floor',
    'city': 'New York',
    'postcode': '10038',
    'borough': 'MANHATTAN',
    'latitude': '40.711313',
    'longitude': '-74.008661',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '1501',
    'bin': '1001245',
    'bbl': '1000890012',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {'company_name': 'Aplus', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Apogee Media',
    'address': '49 West 23rd Street',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.742227',
    'longitude': '-73.991162',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '58',
    'bin': '1080677',
    'bbl': '1008250012',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Aponia Data Solutions',
    'address': '28 west 39th street',
    'address2': '4th floor',
    'city': 'New York',
    'postcode': '10018',
    'borough': 'MANHATTAN',
    'latitude': '40.752033',
    'longitude': '-73.983372',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '84',
    'bin': '1080743',
    'bbl': '1008400063',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': 'Aponia Data Solutions',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'AppAddictive',
    'address': '122 West 26th Street',
    'address2': '5th Floor',
    'city': 'New York',
    'postcode': '10001',
    'borough': 'MANHATTAN',
    'latitude': '40.745164',
    'longitude': '-73.992295',
    'community_board': '4',
    'council_district': '3',
    'census_tract': '91',
    'bin': '1015021',
    'bbl': '1008010055',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'AppFirst',
    'address': '6 West 14th Street',
    'address2': 'Suite 4E',
    'city': 'New York',
    'postcode': '10011',
    'borough': 'MANHATTAN',
    'latitude': '40.736241',
    'longitude': '-73.994201',
    'community_board': '2',
    'council_district': '3',
    'census_tract': '63',
    'bin': '1080157',
    'bbl': '1005770037',
    'nta': 'West Village                                                               '
  }
  , {
    'company_name': 'AppLaunch',
    'address': ' - ',
    'address2': ' - ',
    'city': 'New York'
  }
  , {
    'company_name': 'AppNexus',
    'address': '28 West 23rd St, 4th Fl, New York, NY 10010',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'AppNexus',
    'address': ' - ',
    'address2': '4th Floor',
    'city': 'New York'
  }
  , {'company_name': 'AppNotes', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'AppOrchard',
    'address': '86 Chambers Street',
    'address2': '7th Floor',
    'city': 'New York',
    'postcode': '10007',
    'borough': 'MANHATTAN',
    'latitude': '40.714524',
    'longitude': '-74.007095',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '21',
    'bin': '1079153',
    'bbl': '1001357504',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'AppSavvy',
    'address': '594 Broadway Suite 207',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10012',
    'borough': 'MANHATTAN',
    'latitude': '40.72496',
    'longitude': '-73.997157',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '43',
    'bin': '1007944',
    'bbl': '1005110012',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'AppSense',
    'address': '17 State Street 19th Floor',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10004',
    'borough': 'MANHATTAN',
    'latitude': '40.702798',
    'longitude': '-74.014246',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '9',
    'bin': '1000020',
    'bbl': '1000090014',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {'company_name': 'AppStori', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Appboy', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Appear By Phone',
    'address': '142 East 39 St.',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10016',
    'borough': 'MANHATTAN',
    'latitude': '40.749364',
    'longitude': '-73.977032',
    'community_board': '6',
    'council_district': '4',
    'census_tract': '80',
    'bin': '1019153',
    'bbl': '1008940057',
    'nta': 'Murray Hill-Kips Bay                                                       '
  }
  , {
    'company_name': 'Appetizer Mobile LLC',
    'address': '115 W 45th St',
    'address2': '#501',
    'city': 'New York',
    'postcode': '10036',
    'borough': 'MANHATTAN',
    'latitude': '40.757078',
    'longitude': '-73.983411',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '119',
    'bin': '1022640',
    'bbl': '1009980024',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {'company_name': 'Appetizr', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Appetude', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Appguppy Mobile',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Awesome', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Appinions',
    'address': '18 East 41st St',
    'address2': '2nd Flr',
    'city': 'New York',
    'postcode': '10017',
    'borough': 'MANHATTAN',
    'latitude': '40.752417',
    'longitude': '-73.980448',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '82',
    'bin': '1035324',
    'bbl': '1012750061',
    'nta': 'Murray Hill-Kips Bay                                                       '
  }
  , {
    'company_name': 'Apple',
    'address': '101-104 Fifth Avenue',
    'address2': ' - ',
    'city': 'New York'
  }
  , {
    'company_name': 'Appliances Connection',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Application Security',
    'address': '55 Broad Street',
    'address2': '10th Floor',
    'city': 'New York',
    'postcode': '10004',
    'borough': 'MANHATTAN',
    'latitude': '40.705189',
    'longitude': '-74.011505',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '9',
    'bin': '1000821',
    'bbl': '1000250001',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {
    'company_name': 'Applico',
    'address': '220 East 23rd Street',
    'address2': '5th Floor',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.738548',
    'longitude': '-73.982495',
    'community_board': '6',
    'council_district': '2',
    'census_tract': '64',
    'bin': '1088660',
    'bbl': '1009030047',
    'nta': 'Gramercy                                                                   '
  }
  , {
    'company_name': 'Approved Learning',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'AppsBidder Inc',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Appular',
    'address': '65 Broadway',
    'address2': 'Ste. 903',
    'city': 'New York',
    'postcode': '10006',
    'borough': 'MANHATTAN',
    'latitude': '40.707113',
    'longitude': '-74.012234',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '13',
    'bin': '1000809',
    'bbl': '1000210004',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {
    'company_name': 'Appy Couple from AppeProPo, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Aquarius Global Capital, LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Arc90',
    'address': '747 3rd Ave',
    'address2': '30th Floor',
    'city': 'New York',
    'postcode': '10017',
    'borough': 'MANHATTAN',
    'latitude': '40.753596',
    'longitude': '-73.972374',
    'community_board': '6',
    'council_district': '4',
    'census_tract': '90',
    'bin': '1081179',
    'bbl': '1013200046',
    'nta': 'Turtle Bay-East Midtown                                                    '
  }
  , {
    'company_name': 'Arcade CLOVER',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'ArchetypeMe',
    'address': '5 Crosby Street 3rd Floor',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.719803',
    'longitude': '-74.000393',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '45',
    'bin': '1003052',
    'bbl': '1002330030',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Architizer',
    'address': '281 Fifth Ave',
    'address2': '3rd Floor',
    'city': 'New York',
    'postcode': '10016',
    'borough': 'MANHATTAN',
    'latitude': '40.745822',
    'longitude': '-73.986452',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '74',
    'bin': '1016947',
    'bbl': '1008590085',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': 'Ardency Inn Corp.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Arderoy', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Area17',
    'address': '99 Richardson Street',
    'address2': 'Second Floor',
    'city': 'Brooklyn',
    'postcode': '11211',
    'borough': 'BROOKLYN ',
    'latitude': '40.718501',
    'longitude': '-73.947999',
    'community_board': '1',
    'council_district': '33',
    'census_tract': '499',
    'bin': '3338050',
    'bbl': '3027230038',
    'nta': 'Greenpoint                                                                 '
  }
  , {
    'company_name': 'Arellius Enterprises/Custodis Technologies',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'ArgoFund', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Ark Media',
    'address': '325 Gold St.',
    'address2': 'Suite 602',
    'city': 'Brooklyn',
    'postcode': '11201',
    'borough': 'BROOKLYN ',
    'latitude': '40.694575',
    'longitude': '-73.983267',
    'community_board': '2',
    'council_district': '35',
    'census_tract': '15',
    'bin': '3332462',
    'bbl': '3020490008',
    'nta': 'DUMBO-Vinegar Hill-Downtown Brooklyn-Boerum Hill                           '
  }
  , {
    'company_name': 'Arkadium',
    'address': '920 Broadway',
    'address2': '2nd Floor',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.739691',
    'longitude': '-73.989423',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '52',
    'bin': '1016224',
    'bbl': '1008490063',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {'company_name': 'Armada', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Armani', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Armoryinteractive LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Arn-Star Properties',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'AromaGo', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Arrive', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Arrow Leads Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Art In Your Space',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Art Matters',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Art Story', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Art. Lebedev Studio',
    'address': '125 Maiden Lane',
    'address2': 'Suite 15D',
    'city': 'New York',
    'postcode': '10038',
    'borough': 'MANHATTAN',
    'latitude': '40.706397',
    'longitude': '-74.006341',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '1502',
    'bin': '1087484',
    'bbl': '1000707501',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {
    'company_name': 'Art.sy',
    'address': '401 Broadway, 25th Flr, New York, NY 10013',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'ArtCondo', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'ArtCycle',
    'address': '32 Court Street #801',
    'address2': ' - ',
    'city': 'Brooklyn',
    'postcode': '11201',
    'borough': 'BROOKLYN ',
    'latitude': '40.693014',
    'longitude': '-73.990758',
    'community_board': '2',
    'council_district': '33',
    'census_tract': '9',
    'bin': '3002248',
    'bbl': '3002550044',
    'nta': 'Brooklyn Heights-Cobble Hill                                               '
  }
  , {
    'company_name': 'ArtList',
    'address': '59 Franklin St.',
    'address2': 'Store A',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.717096',
    'longitude': '-74.002832',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '31',
    'bin': '1001840',
    'bbl': '1001710005',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {'company_name': 'ArtSpot', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'ArtStar Inc',
    'address': '405 w 23rd St',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10011',
    'borough': 'MANHATTAN',
    'latitude': '40.746712',
    'longitude': '-74.001826',
    'community_board': '4',
    'council_district': '3',
    'census_tract': '93',
    'bin': '1077236',
    'bbl': '1007217501',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Article One Partners',
    'address': '555 Madison Avenue',
    'address2': '30th Floor',
    'city': 'New York',
    'postcode': '10022',
    'borough': 'MANHATTAN',
    'latitude': '40.761177',
    'longitude': '-73.973161',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '102',
    'bin': '1035775',
    'bbl': '1012910051',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': 'Artificial Elegance',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Artisan Online',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Artissano', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'ArtistUpgrade',
    'address': '34-27 41st Street',
    'address2': ' - ',
    'city': 'Long Island City',
    'postcode': '11101',
    'borough': 'QUEENS   ',
    'latitude': '40.755781',
    'longitude': '-73.920476',
    'community_board': '1',
    'council_district': '26',
    'census_tract': '159',
    'bin': '4010920',
    'bbl': '4006740009',
    'nta': 'Astoria                                                                    '
  }
  , {'company_name': 'Artista', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Artivest',
    'address': '1140 Broadway',
    'address2': 'Suite 1501',
    'city': 'New York',
    'postcode': '10001',
    'borough': 'MANHATTAN',
    'latitude': '40.743907',
    'longitude': '-73.988979',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '58',
    'bin': '1015649',
    'bbl': '1008280033',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {'company_name': 'Artsicle', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Artsicle', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Artspace',
    'address': '915 Broadway',
    'address2': 'Suite 602',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.739644',
    'longitude': '-73.989654',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '52',
    'bin': '1016226',
    'bbl': '1008490070',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {'company_name': 'Artwalk', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'ArxSocial',
    'address': '420 Lexington Avenue',
    'address2': 'Suite 2516',
    'city': 'New York',
    'postcode': '10170',
    'borough': 'MANHATTAN',
    'latitude': '40.752262',
    'longitude': '-73.975464',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '92',
    'bin': '1035385',
    'bbl': '1012807501',
    'nta': 'Turtle Bay-East Midtown                                                    '
  }
  , {
    'company_name': 'Asanda AVEDA Spa Lounge',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Ashe Avenue',
    'address': '67 West St. Floor 4',
    'address2': '(Greendesk #C6)',
    'city': 'Brooklyn',
    'postcode': '11222',
    'borough': 'BROOKLYN ',
    'latitude': '40.728661',
    'longitude': '-73.959082',
    'community_board': '1',
    'council_district': '33',
    'census_tract': '565',
    'bin': '3337600',
    'bbl': '3025640001',
    'nta': 'Greenpoint                                                                 '
  }
  , {
    'company_name': 'Asia Coal Catalyst Company',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Asia Coal Catalyst Company',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Asoko Insight',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Assassin X Tour',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Assegai LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'AssetCompass',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Associated Renewable Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Assured Labor',
    'address': '122 W. 26th St.',
    'address2': '4th Floor',
    'city': 'New York',
    'postcode': '10001',
    'borough': 'MANHATTAN',
    'latitude': '40.745164',
    'longitude': '-73.992295',
    'community_board': '4',
    'council_district': '3',
    'census_tract': '91',
    'bin': '1015021',
    'bbl': '1008010055',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Astral Consulting Services, LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'AstrologyMe',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Asvan', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Asymptote Security',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'At Peak', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Ataboy Studios',
    'address': '1133 Broadway',
    'address2': '#1328',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.743523',
    'longitude': '-73.989073',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '58',
    'bin': '1015625',
    'bbl': '1008270049',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Atari Interactive',
    'address': '417 Fifth Avenue',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10016',
    'borough': 'MANHATTAN',
    'latitude': '40.750691',
    'longitude': '-73.982907',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '82',
    'bin': '1017224',
    'bbl': '1008670070',
    'nta': 'Murray Hill-Kips Bay                                                       '
  }
  , {'company_name': 'Atavist', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Atavist',
    'address': '68 Jay Street',
    'address2': 'Suite 422',
    'city': 'Brooklyn',
    'postcode': '11201',
    'borough': 'BROOKLYN ',
    'latitude': '40.702763',
    'longitude': '-73.986681',
    'community_board': '2',
    'council_district': '33',
    'census_tract': '21',
    'bin': '3000090',
    'bbl': '3000400001',
    'nta': 'DUMBO-Vinegar Hill-Downtown Brooklyn-Boerum Hill                           '
  }
  , {
    'company_name': 'Atelier Brush',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Baya Weavers Collective',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Atikus Investments Incorporated',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Atlantic Metro Communications',
    'address': '325 Hudson St',
    'address2': '4th floor',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.726774',
    'longitude': '-74.007418',
    'community_board': '2',
    'council_district': '3',
    'census_tract': '37',
    'bin': '1010375',
    'bbl': '1005970062',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {'company_name': 'Atlas ATS', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Atlas Gameworks',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Atlas Scientific',
    'address': '630 Flushing Avenue',
    'address2': '8th Floor',
    'city': 'Brooklyn',
    'postcode': '11206',
    'borough': 'BROOKLYN ',
    'latitude': '40.699963',
    'longitude': '-73.948449',
    'community_board': '3',
    'council_district': '36',
    'census_tract': '257',
    'bin': '3329628',
    'bbl': '3017200001',
    'nta': 'Bedford                                                                    '
  }
  , {
    'company_name': 'Atomicmonkey',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Atomite, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Atozus', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Attendingdr',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Au Contraire',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Audiobrain',
    'address': '20 W. 22nd St.',
    'address2': 'Suite 712',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.741253',
    'longitude': '-73.990978',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '58',
    'bin': '1015540',
    'bbl': '1008230055',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Audioms',
    'address': '81 Carroll St',
    'address2': ' - ',
    'city': 'New York'
  }
  , {
    'company_name': 'Augmate Corporation',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Augmate Corporation',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Aura Central Market of Aura Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Auralis Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Aurnhammer LLC',
    'address': '55 Broad Street',
    'address2': '13th Floor',
    'city': 'New York',
    'postcode': '10004',
    'borough': 'MANHATTAN',
    'latitude': '40.705189',
    'longitude': '-74.011505',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '9',
    'bin': '1000821',
    'bbl': '1000250001',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {
    'company_name': 'Ausmode.com',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Authintic', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Authorea', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Authorstransinc@gmail.com',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'AutoSlash.com',
    'address': '405 Main Street Suite 9R',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10044',
    'borough': 'MANHATTAN',
    'latitude': '40.757748',
    'longitude': '-73.953581',
    'community_board': '8',
    'council_district': '5',
    'census_tract': '23801',
    'bin': '1087314',
    'bbl': '1013737504',
    'nta': 'Lenox Hill-Roosevelt Island                                                '
  }
  , {
    'company_name': 'Autumn Games',
    'address': '54 Thompson St.',
    'address2': '4th Flr',
    'city': 'New York',
    'postcode': '10012',
    'borough': 'MANHATTAN',
    'latitude': '40.724043',
    'longitude': '-74.003316',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '47',
    'bin': '1007320',
    'bbl': '1004887501',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Auxiliary Design Company',
    'address': '117 Dobbin St',
    'address2': 'Suite 206',
    'city': 'Brooklyn',
    'postcode': '11222',
    'borough': 'BROOKLYN ',
    'latitude': '40.725808',
    'longitude': '-73.954974',
    'community_board': '1',
    'council_district': '33',
    'census_tract': '561',
    'bin': '3065491',
    'bbl': '3026160012',
    'nta': 'Greenpoint                                                                 '
  }
  , {'company_name': 'Availendar', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Avalanche Studios',
    'address': '536 Broadway',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10012',
    'borough': 'MANHATTAN',
    'latitude': '40.723341',
    'longitude': '-73.998528',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '43',
    'bin': '1007561',
    'bbl': '1004970004',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Avatar New York',
    'address': '122 Hudson Street',
    'address2': '4th Floor',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.72005',
    'longitude': '-74.008553',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '33',
    'bin': '1002165',
    'bbl': '1001900016',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Avec',
    'address': '265 Canal Street',
    'address2': 'Suite 509',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.718804',
    'longitude': '-74.001039',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '45',
    'bin': '1002692',
    'bbl': '1002090028',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'AviantLogic, Inc',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Awl & Sundry',
    'address': '175 Varick Street',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10014',
    'borough': 'MANHATTAN',
    'latitude': '40.727392',
    'longitude': '-74.005517',
    'community_board': '2',
    'council_district': '3',
    'census_tract': '37',
    'bin': '1009754',
    'bbl': '1005800065',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'AxialMarket',
    'address': '45 EAST 20TH STREET',
    'address2': '12TH FLOOR',
    'city': 'New York',
    'postcode': '10003',
    'borough': 'MANHATTAN',
    'latitude': '40.738851',
    'longitude': '-73.988983',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '52',
    'bin': '1016211',
    'bbl': '1008490031',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Ayima',
    'address': '99 Hudson Street',
    'address2': '5th Floor',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.719133',
    'longitude': '-74.008741',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '39',
    'bin': '1075728',
    'bbl': '1001817504',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Ayo! Social Inc',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Azlore', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'B Culture Media',
    'address': '36 East 23rd Street',
    'address2': 'Suite 5F',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.740671',
    'longitude': '-73.987528',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '56',
    'bin': '1016291',
    'bbl': '1008510051',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'B Holding Group, LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'B&g tourism',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'B-OUT', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'B-Reel Products',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'B. Side Swimwear LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'B.O.S.S.', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'B2B Anywhere',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'BABB', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'BACK UP BACK',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'BAX US', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'BBC Worldwide',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'BBDO',
    'address': '1285 Avenue of the Americas',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10019',
    'borough': 'MANHATTAN',
    'latitude': '40.760753',
    'longitude': '-73.979818',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '131',
    'bin': '1023158',
    'bbl': '1010040029',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': 'BDominant LLC',
    'address': '115 East 57th Street',
    'address2': '11',
    'city': 'New York',
    'postcode': '10022',
    'borough': 'MANHATTAN',
    'latitude': '40.7613',
    'longitude': '-73.969996',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '11203',
    'bin': '1036926',
    'bbl': '1013127501',
    'nta': 'Turtle Bay-East Midtown                                                    '
  }
  , {'company_name': 'BEAK', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'BEAR', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'BELGIUM MART LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'BIReady', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'BLACK ARMOUR',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'BLACK RENAISSANCE TECHNOLGY',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'BODI~CANDLES, LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'BOLD Organics',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'BOND', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'BOWNCE LLC', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'BOX Creative',
    'address': '518 Broadway',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10012',
    'borough': 'MANHATTAN',
    'latitude': '40.722666',
    'longitude': '-73.999102',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '45',
    'bin': '1007236',
    'bbl': '1004830014',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {'company_name': 'BOXNGO', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'BRANDmini', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'BRI HOLLOWELL',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'BYOB', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Baaltaz', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Baby Bundle',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'BabyCenter, LLC',
    'address': '711 Third Avenue',
    'address2': '1502',
    'city': 'New York',
    'postcode': '10017',
    'borough': 'MANHATTAN',
    'latitude': '40.752374',
    'longitude': '-73.973266',
    'community_board': '6',
    'council_district': '4',
    'census_tract': '90',
    'bin': '1037568',
    'bbl': '1013180001',
    'nta': 'Turtle Bay-East Midtown                                                    '
  }
  , {
    'company_name': 'Babysitters America',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Badger', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Bajan Yankee Pictures Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Baking for Good',
    'address': '353 East 83rd Street',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10028',
    'borough': 'MANHATTAN',
    'latitude': '40.775412',
    'longitude': '-73.951929',
    'community_board': '8',
    'council_district': '5',
    'census_tract': '138',
    'bin': '1049931',
    'bbl': '1015460023',
    'nta': 'Yorkville                                                                  '
  }
  , {
    'company_name': 'Balance Engineering, LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Balance Media, LLC',
    'address': '34 W 27th St',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10001',
    'borough': 'MANHATTAN',
    'latitude': '40.744829',
    'longitude': '-73.989592',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '58',
    'bin': '1015664',
    'bbl': '1008280067',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Bali Pharma',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Ballooning Nest Eggs, Inc.',
    'address': '451 West End Avenue',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10024',
    'borough': 'MANHATTAN',
    'latitude': '40.786037',
    'longitude': '-73.979944',
    'community_board': '7',
    'council_district': '6',
    'census_tract': '167',
    'bin': '1080438',
    'bbl': '1012440072',
    'nta': 'Upper West Side                                                            '
  }
  , {
    'company_name': 'Ballooning Nest Eggs, Inc.- Astia portfolio company',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Ballroom Rocks LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Baltia Airlines',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Bandsintown',
    'address': '215 Lexington Ave',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10016',
    'borough': 'MANHATTAN',
    'latitude': '40.745541',
    'longitude': '-73.980339',
    'community_board': '6',
    'council_district': '2',
    'census_tract': '72',
    'bin': '1018474',
    'bbl': '1008887502',
    'nta': 'Murray Hill-Kips Bay                                                       '
  }
  , {'company_name': 'Bandwaggon', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Bandwagon', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Bandwagon (Weeels, Inc.)',
    'address': '137 Varick Street',
    'address2': '1st Floor',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.725789',
    'longitude': '-74.005773',
    'community_board': '2',
    'council_district': '3',
    'census_tract': '37',
    'bin': '1009745',
    'bbl': '1005790070',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Bandwidth Productions',
    'address': '134 West 26th Street',
    'address2': 'Suite 1001',
    'city': 'New York',
    'postcode': '10001',
    'borough': 'MANHATTAN',
    'latitude': '40.745266',
    'longitude': '-73.99254',
    'community_board': '4',
    'council_district': '3',
    'census_tract': '91',
    'bin': '1015025',
    'bbl': '1008010061',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {'company_name': 'Banking Up', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Boomset Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Boomset Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Banking Up',
    'address': '55 Broad Street',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10004',
    'borough': 'MANHATTAN',
    'latitude': '40.705189',
    'longitude': '-74.011505',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '9',
    'bin': '1000821',
    'bbl': '1000250001',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {
    'company_name': 'Bar & Club Stats, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Bar & Club Stats, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'BareSkin Bags',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Bargan Technology, LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'BarkBox',
    'address': '50 Eldridge Street',
    'address2': 'Floor 5',
    'city': 'New York',
    'postcode': '10002',
    'borough': 'MANHATTAN',
    'latitude': '40.716012',
    'longitude': '-73.993052',
    'community_board': '3',
    'council_district': '1',
    'census_tract': '16',
    'bin': '1003881',
    'bbl': '1003000008',
    'nta': 'Chinatown                                                                  '
  }
  , {
    'company_name': 'Barnes & Noble',
    'address': '76 Ninth Avenue',
    'address2': '9th Floor',
    'city': 'New York',
    'postcode': '10011',
    'borough': 'MANHATTAN',
    'latitude': '40.741915',
    'longitude': '-74.004659',
    'community_board': '4',
    'council_district': '3',
    'census_tract': '83',
    'bin': '1013043',
    'bbl': '1007390001',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Barnes and Hoggetts',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Baro', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Barrel',
    'address': '197 Grand Street',
    'address2': 'Suite 7S',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.71918',
    'longitude': '-73.996894',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '41',
    'bin': '1003090',
    'bbl': '1002370014',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {'company_name': 'Bart', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Baruch College',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Barzaga Capital',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Bateman Group',
    'address': '45 Main Street',
    'address2': 'Suite 617',
    'city': 'Brooklyn',
    'postcode': '11201',
    'borough': 'BROOKLYN ',
    'latitude': '40.702799',
    'longitude': '-73.990677',
    'community_board': '2',
    'council_district': '33',
    'census_tract': '21',
    'bin': '3329423',
    'bbl': '3000370001',
    'nta': 'DUMBO-Vinegar Hill-Downtown Brooklyn-Boerum Hill                           '
  }
  , {
    'company_name': 'Bates CHI&Partners (Estranged Freelance)',
    'address': 'Block Zero',
    'address2': 'Room Zero',
    'city': 'New York'
  }
  , {
    'company_name': 'Battery Park Media (Battery Park City NEWS)',
    'address': '11 Broadway',
    'address2': '457',
    'city': 'New York',
    'postcode': '10004',
    'borough': 'MANHATTAN',
    'latitude': '40.705354',
    'longitude': '-74.013731',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '13',
    'bin': '1000044',
    'bbl': '1000130005',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {
    'company_name': 'BaubleBar',
    'address': '230 Fifth Ave',
    'address2': 'Ste. 612',
    'city': 'New York',
    'postcode': '10001',
    'borough': 'MANHATTAN',
    'latitude': '40.743918',
    'longitude': '-73.987867',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '58',
    'bin': '1015654',
    'bbl': '1008280041',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'BaubleBar',
    'address': '131 Greene St',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10012',
    'borough': 'MANHATTAN',
    'latitude': '40.725292',
    'longitude': '-73.999116',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '49',
    'bin': '1076021',
    'bbl': '1005147502',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Bawn Media Networks, Inc',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Bayshore Networks Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Bazaart',
    'address': '330 West 38 Street',
    'address2': 'Suite 300',
    'city': 'New York',
    'postcode': '10018',
    'borough': 'MANHATTAN',
    'latitude': '40.755139',
    'longitude': '-73.992669',
    'community_board': '4',
    'council_district': '3',
    'census_tract': '111',
    'bin': '1013627',
    'bbl': '1007610053',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Bazaarvoice',
    'address': '126 5th Ave',
    'address2': '804',
    'city': 'New York',
    'postcode': '10011',
    'borough': 'MANHATTAN',
    'latitude': '40.738338',
    'longitude': '-73.991931',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '54',
    'bin': '1015421',
    'bbl': '1008190044',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Bazarnewyork.com',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'BeQRious', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Beach Facility Innovations',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Beach Glam', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Beach Glam LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'BeanJar, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Beau Exchange',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Beaut.ly', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Beauteeze', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Beautiful Villa',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Beauty Twin',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'BeautyStat', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Bedrock Divorce Advisors, LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Bedrocket Media Ventures',
    'address': '560 Broadway at Prince St ',
    'address2': ' - ',
    'city': 'New York'
  }
  , {
    'company_name': 'Bee Organic',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Bee*kin LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'BeeOnTheGo', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'BeejooS', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'BeenVerified',
    'address': '307 5th Avenue',
    'address2': '16th Floor',
    'city': 'New York',
    'postcode': '10016',
    'borough': 'MANHATTAN',
    'latitude': '40.746786',
    'longitude': '-73.985755',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '74',
    'bin': '1016982',
    'bbl': '1008610003',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': 'Beer2Buds',
    'address': '175 Varick St',
    'address2': '4th Floor',
    'city': 'New York',
    'postcode': '10014',
    'borough': 'MANHATTAN',
    'latitude': '40.727392',
    'longitude': '-74.005517',
    'community_board': '2',
    'council_district': '3',
    'census_tract': '37',
    'bin': '1009754',
    'bbl': '1005800065',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'BeerRightNow.com',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Before the Label',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Behance', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Bell Boardz',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Ben Vision Research, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'BenchPals', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'BenchPals', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'BeneShip', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'BeneStream', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Benjamin Capital Management Group Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Bennett Architects, Designers',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Berlin Cameron',
    'address': '100 6th Avenue',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.723324',
    'longitude': '-74.004903',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '47',
    'bin': '1007098',
    'bbl': '1004760007',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Berry Smart Smoothies',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'City Health Works!',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Bespoke Atelier',
    'address': '262 west 38th street',
    'address2': 'Suite 303',
    'city': 'New York',
    'postcode': '10018',
    'borough': 'MANHATTAN',
    'latitude': '40.754216',
    'longitude': '-73.990478',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '109',
    'bin': '1014468',
    'bbl': '1007870076',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': 'Bespoke Post',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Best Bite', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Best Biz Survis',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Best Investments',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'BestDailyDates',
    'address': '244 5th Ave',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10001',
    'borough': 'MANHATTAN',
    'latitude': '40.744521',
    'longitude': '-73.987427',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '58',
    'bin': '1015690',
    'bbl': '1008290040',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'BestFriendMatch.com',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'BestRecom Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'BestVendor',
    'address': '524 Broadway',
    'address2': 'Rm 403',
    'city': 'New York',
    'postcode': '10012',
    'borough': 'MANHATTAN',
    'latitude': '40.7228',
    'longitude': '-73.998986',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '45',
    'bin': '1007238',
    'bbl': '1004830017',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Bestflightbook.com',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Bestowed', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Betabeat',
    'address': '321 W 44th st',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10036',
    'borough': 'MANHATTAN',
    'latitude': '40.75889',
    'longitude': '-73.989669',
    'community_board': '4',
    'council_district': '3',
    'census_tract': '121',
    'bin': '1080878',
    'bbl': '1010350017',
    'nta': 'Clinton                                                                    '
  }
  , {'company_name': 'Betobe', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Better Future Engineering',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Better Life',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Better Restaurant Group',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Better Schools for Everyone',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'BetterBizWorks, LLC',
    'address': '1855 Victory Blvd.',
    'address2': '2nd Floor',
    'city': 'Staten Island'
  }
  , {
    'company_name': 'BetterCloud',
    'address': '299 Broadway',
    'address2': '1310',
    'city': 'New York',
    'postcode': '10007',
    'borough': 'MANHATTAN',
    'latitude': '40.715046',
    'longitude': '-74.005591',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '33',
    'bin': '1001648',
    'bbl': '1001500031',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Betterfly',
    'address': '621 Second Ave',
    'address2': 'Second Floor',
    'city': 'New York',
    'postcode': '10016',
    'borough': 'MANHATTAN',
    'latitude': '40.744684',
    'longitude': '-73.975961',
    'community_board': '6',
    'council_district': '2',
    'census_tract': '70',
    'bin': '1020129',
    'bbl': '1009140035',
    'nta': 'Murray Hill-Kips Bay                                                       '
  }
  , {
    'company_name': 'Betterment',
    'address': '61 W 23rd 5th Floor, NY NY 10019',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Bevs Home Services',
    'address': '1 Piermont Plaza ',
    'address2': ' - ',
    'city': 'Brooklyn '
  }
  , {
    'company_name': 'Beyond',
    'address': '300 Park Avenue South',
    'address2': '11th Floor',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.739921',
    'longitude': '-73.986569',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '56',
    'bin': '1016286',
    'bbl': '1008510035',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Beyond Vision Group',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Bib + Tuck', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Bibi', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Bid4MyTradeIn.com',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'BidKind', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'BidOnMyTickets.com',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Bidzulu', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Big Apple Fire Engine Tours',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Big Dick Productions',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Big Drop Inc.',
    'address': '11 Broadway ',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10004',
    'borough': 'MANHATTAN',
    'latitude': '40.705354',
    'longitude': '-74.013731',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '13',
    'bin': '1000044',
    'bbl': '1000130005',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {
    'company_name': 'Big Fuel Communications',
    'address': '40 W 23rd St',
    'address2': '5th Flr',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.742123',
    'longitude': '-73.99096',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '58',
    'bin': '1080674',
    'bbl': '1008240028',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Big Human',
    'address': '51 E 12th Street',
    'address2': '9th Floor',
    'city': 'New York',
    'postcode': '10003',
    'borough': 'MANHATTAN',
    'latitude': '40.733373',
    'longitude': '-73.99147',
    'community_board': '2',
    'council_district': '2',
    'census_tract': '61',
    'bin': '1009203',
    'bbl': '1005640022',
    'nta': 'West Village                                                               '
  }
  , {
    'company_name': 'Brooklyn SkyBox Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Big Spaceship',
    'address': '45 Main Street',
    'address2': 'Suite 716',
    'city': 'Brooklyn',
    'postcode': '11201',
    'borough': 'BROOKLYN ',
    'latitude': '40.702799',
    'longitude': '-73.990677',
    'community_board': '2',
    'council_district': '33',
    'census_tract': '21',
    'bin': '3329423',
    'bbl': '3000370001',
    'nta': 'DUMBO-Vinegar Hill-Downtown Brooklyn-Boerum Hill                           '
  }
  , {
    'company_name': 'Big Sweet Nutrition',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'BigTwist', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Bignay', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Bijoor', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Bikram Yoga Staten Island',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'BillGuard', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Billboard',
    'address': '770 Broadway',
    'address2': '7',
    'city': 'New York',
    'postcode': '10003',
    'borough': 'MANHATTAN',
    'latitude': '40.730842',
    'longitude': '-73.991402',
    'community_board': '2',
    'council_district': '2',
    'census_tract': '57',
    'bin': '1008952',
    'bbl': '1005540001',
    'nta': 'West Village                                                               '
  }
  , {'company_name': 'Bindo', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Bio-Cep', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Bio-Signal Group Corp.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'BioAegis Therapeutics, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'BioDigital',
    'address': '594 Broadway',
    'address2': 'Suite 606',
    'city': 'New York',
    'postcode': '10012',
    'borough': 'MANHATTAN',
    'latitude': '40.72496',
    'longitude': '-73.997157',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '43',
    'bin': '1007944',
    'bbl': '1005110012',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'BioLite',
    'address': '68 Jay Street',
    'address2': 'Suite 309',
    'city': 'Brooklyn',
    'postcode': '11201',
    'borough': 'BROOKLYN ',
    'latitude': '40.702763',
    'longitude': '-73.986681',
    'community_board': '2',
    'council_district': '33',
    'census_tract': '21',
    'bin': '3000090',
    'bbl': '3000400001',
    'nta': 'DUMBO-Vinegar Hill-Downtown Brooklyn-Boerum Hill                           '
  }
  , {'company_name': 'Biogrify', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Bionee LLC', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Bionest Partners',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Boonty',
    'address': '54 Franklin Street',
    'address2': '3F',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.717014',
    'longitude': '-74.002626',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '31',
    'bin': '1001872',
    'bbl': '1001720030',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Biosof LLC',
    'address': '138 West 25th Street',
    'address2': '10th Floor',
    'city': 'New York',
    'postcode': '10001',
    'borough': 'MANHATTAN',
    'latitude': '40.744684',
    'longitude': '-73.993071',
    'community_board': '4',
    'council_district': '3',
    'census_tract': '91',
    'bin': '1014991',
    'bbl': '1008000061',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {'company_name': 'Bipe.me', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Birch Coffee',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Birchbox',
    'address': '230 Park Ave S, Suite 201, New York, NY 10003',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Bisqit, LLC',
    'address': '1430 US 206',
    'address2': 'Suite 210',
    'city': 'Bedminster'
  }
  , {'company_name': 'BitFetcher', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'BitInstant LLC',
    'address': '20 W 23rd Stâ€šÃ„Ã©',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.741925',
    'longitude': '-73.990487',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '58',
    'bin': '1015571',
    'bbl': '1008240050',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {'company_name': 'BiteHunter', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'BiteHunter Corporation',
    'address': '95 Morton St',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10014',
    'borough': 'MANHATTAN',
    'latitude': '40.73113',
    'longitude': '-74.008573',
    'community_board': '2',
    'council_district': '3',
    'census_tract': '69',
    'bin': '1010404',
    'bbl': '1006030028',
    'nta': 'West Village                                                               '
  }
  , {
    'company_name': 'Bitly',
    'address': '85 5th Avenue',
    'address2': '4th Flr',
    'city': 'New York',
    'postcode': '10003',
    'borough': 'MANHATTAN',
    'latitude': '40.737416',
    'longitude': '-73.992581',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '52',
    'bin': '1016080',
    'bbl': '1008440001',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {'company_name': 'Bitly', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Bitsocket, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Bivi', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'BizSlate Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'BizSlate Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Bizbash Media',
    'address': '8 West 38th Street',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10018',
    'borough': 'MANHATTAN',
    'latitude': '40.751215',
    'longitude': '-73.983354',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '84',
    'bin': '1075696',
    'bbl': '1008390055',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': 'Bizo, Inc.',
    'address': '1123 Broadway',
    'address2': 'Suite 507',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.743254',
    'longitude': '-73.989123',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '58',
    'bin': '1015618',
    'bbl': '1008270028',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Bizodo',
    'address': '7th Ave',
    'address2': ' - ',
    'city': 'New York'
  }
  , {'company_name': 'Bizzabo', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Black + Blanco',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Black Business Now',
    'address': '318 West 118th Street',
    'address2': 'Floor 1',
    'city': 'New York',
    'postcode': '10026',
    'borough': 'MANHATTAN',
    'latitude': '40.806012',
    'longitude': '-73.955118',
    'community_board': '10',
    'council_district': '9',
    'census_tract': '20102',
    'bin': '1059072',
    'bbl': '1019440043',
    'nta': 'Central Harlem South                                                       '
  }
  , {
    'company_name': 'Black Diamond Pictures, LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Black Hammer Productions',
    'address': '447 Broadway',
    'address2': 'Floor 2',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.720393',
    'longitude': '-74.001053',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '47',
    'bin': '1003022',
    'bbl': '1002310037',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Black Lapel',
    'address': '475 Park Avenue South',
    'address2': '4th Floor',
    'city': 'New York',
    'postcode': '10016',
    'borough': 'MANHATTAN',
    'latitude': '40.745646',
    'longitude': '-73.982378',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '72',
    'bin': '1018471',
    'bbl': '1008870095',
    'nta': 'Murray Hill-Kips Bay                                                       '
  }
  , {
    'company_name': 'Black Mountain Systems',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Black Reniassance Technology',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Black Rock', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Black Sheep projects',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'BlackFeet Films',
    'address': '132 Lexington Avenue.',
    'address2': ' - ',
    'city': 'Brooklyn',
    'postcode': '11216',
    'borough': 'BROOKLYN ',
    'latitude': '40.687055',
    'longitude': '-73.956266',
    'community_board': '3',
    'council_district': '36',
    'census_tract': '229',
    'bin': '3056453',
    'bbl': '3019710007',
    'nta': 'Clinton Hill                                                               '
  }
  , {
    'company_name': 'Blackwall Capital Markets',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'BlankSlate',
    'address': '68 Jay Street',
    'address2': 'Suite 512',
    'city': 'Brooklyn',
    'postcode': '11201',
    'borough': 'BROOKLYN ',
    'latitude': '40.702763',
    'longitude': '-73.986681',
    'community_board': '2',
    'council_district': '33',
    'census_tract': '21',
    'bin': '3000090',
    'bbl': '3000400001',
    'nta': 'DUMBO-Vinegar Hill-Downtown Brooklyn-Boerum Hill                           '
  }
  , {
    'company_name': 'Blast Radius',
    'address': '284 Madison Avenue',
    'address2': '9th floor',
    'city': 'New York',
    'postcode': '10017',
    'borough': 'MANHATTAN',
    'latitude': '40.751673',
    'longitude': '-73.980124',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '82',
    'bin': '1035316',
    'bbl': '1012750014',
    'nta': 'Murray Hill-Kips Bay                                                       '
  }
  , {'company_name': 'Blazetrak', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Blazetrak.com',
    'address': '1133 Broadway',
    'address2': 'Suite 706',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.743523',
    'longitude': '-73.989073',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '58',
    'bin': '1015625',
    'bbl': '1008270049',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {'company_name': 'Bleepr', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'BlendED K-12',
    'address': '62 Clermont Ave',
    'address2': 'Suite 405',
    'city': 'Brooklyn',
    'postcode': '11205',
    'borough': 'BROOKLYN ',
    'latitude': '40.695407',
    'longitude': '-73.971323',
    'community_board': '2',
    'council_district': '35',
    'census_tract': '187',
    'bin': '3390220',
    'bbl': '3020450053',
    'nta': 'Fort Greene                                                                '
  }
  , {
    'company_name': 'Blended Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Blenderbox',
    'address': '26 Dobbin St',
    'address2': ' - ',
    'city': 'Brooklyn',
    'postcode': '11222',
    'borough': 'BROOKLYN ',
    'latitude': '40.723233',
    'longitude': '-73.953479',
    'community_board': '1',
    'council_district': '33',
    'census_tract': '569',
    'bin': '3065960',
    'bbl': '3026430029',
    'nta': 'Greenpoint                                                                 '
  }
  , {
    'company_name': 'Blinkbuggy, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Blinpick', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Blinq', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Blip',
    'address': '636 Broadway',
    'address2': '3rd Floor',
    'city': 'New York',
    'postcode': '10012',
    'borough': 'MANHATTAN',
    'latitude': '40.726247',
    'longitude': '-73.996067',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '5502',
    'bin': '1008213',
    'bbl': '1005220012',
    'nta': 'West Village                                                               '
  }
  , {
    'company_name': 'Blipit LLC',
    'address': '110E 28th street',
    'address2': 'Floor 8',
    'city': 'New York',
    'postcode': '10016',
    'borough': 'MANHATTAN',
    'latitude': '40.743042',
    'longitude': '-73.983418',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '68',
    'bin': '1018203',
    'bbl': '1008830088',
    'nta': 'Gramercy                                                                   '
  }
  , {
    'company_name': 'Bliss and Care Spa',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Blitor', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'BlocPower', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Block to Rock',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Blocksy.com',
    'address': '17 Battery Place',
    'address2': '25th Floor',
    'city': 'New York',
    'postcode': '10004',
    'borough': 'MANHATTAN',
    'latitude': '40.704884',
    'longitude': '-74.015927',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '13',
    'bin': '1082634',
    'bbl': '1000157501',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {
    'company_name': 'Blood, Sweat & Cheers',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Blood, Sweat & Cheers',
    'address': '12 Desbrosses St',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.723365',
    'longitude': '-74.008756',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '39',
    'bin': '1002932',
    'bbl': '1002250006',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Bloomberg',
    'address': '731 Lexington Ave',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10022',
    'borough': 'MANHATTAN',
    'latitude': '40.761887',
    'longitude': '-73.968421',
    'community_board': '6',
    'council_district': '4',
    'census_tract': '11203',
    'bin': '1086160',
    'bbl': '1013137501',
    'nta': 'Turtle Bay-East Midtown                                                    '
  }
  , {
    'company_name': 'Blu Trumpet',
    'address': '555 W18th Street',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10011',
    'borough': 'MANHATTAN',
    'latitude': '40.745134',
    'longitude': '-74.007525',
    'community_board': '4',
    'council_district': '3',
    'census_tract': '99',
    'bin': '1012280',
    'bbl': '1006900012',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'BluEarth Aromatherapy',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Blue 2.0',
    'address': '55 Water Street',
    'address2': '4',
    'city': 'Brooklyn',
    'postcode': '11201',
    'borough': 'BROOKLYN ',
    'latitude': '40.703301',
    'longitude': '-73.992047',
    'community_board': '2',
    'council_district': '33',
    'census_tract': '21',
    'bin': '3000019',
    'bbl': '3000260050',
    'nta': 'DUMBO-Vinegar Hill-Downtown Brooklyn-Boerum Hill                           '
  }
  , {
    'company_name': 'Blue Apron',
    'address': '5 Crosby St.',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.719803',
    'longitude': '-74.000393',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '45',
    'bin': '1003052',
    'bbl': '1002330030',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Blue Bonnet Basket',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Blue Breeze',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Blue Cups U',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Blue Fountain Media',
    'address': '102 Madison Ave',
    'address2': '2nd Flr',
    'city': 'New York',
    'postcode': '10016',
    'borough': 'MANHATTAN',
    'latitude': '40.74482',
    'longitude': '-73.985113',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '74',
    'bin': '1016928',
    'bbl': '1008590015',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': 'Blue Label Labs',
    'address': '902 Broadway',
    'address2': '4th Floor',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.739279',
    'longitude': '-73.989726',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '52',
    'bin': '1016201',
    'bbl': '1008490016',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Blue Phoenix Media',
    'address': '265 Canal Street',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.718804',
    'longitude': '-74.001039',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '45',
    'bin': '1002692',
    'bbl': '1002090028',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Blue State Digital',
    'address': '101 Ave of the Americas',
    'address2': '12th FL',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.723247',
    'longitude': '-74.004957',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '37',
    'bin': '1007119',
    'bbl': '1004770011',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Blue Telescope',
    'address': '236 W 30th St',
    'address2': '# 700',
    'city': 'New York',
    'postcode': '10001',
    'borough': 'MANHATTAN',
    'latitude': '40.748952',
    'longitude': '-73.993623',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '95',
    'bin': '1014302',
    'bbl': '1007790063',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {'company_name': 'BlueCheck', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'BlueLine Grid, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'BlueMetal Architects',
    'address': '14 Wall Street',
    'address2': '20th Floor',
    'city': 'New York',
    'postcode': '10005',
    'borough': 'MANHATTAN',
    'latitude': '40.707347',
    'longitude': '-74.010997',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '7',
    'bin': '1001025',
    'bbl': '1000460009',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {
    'company_name': 'Bluewolf Group',
    'address': '11 East 26th Street',
    'address2': '21st Floor',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.743188',
    'longitude': '-73.98755',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '56',
    'bin': '1016876',
    'bbl': '1008560009',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Bluum',
    'address': '325 W. 38th St.',
    'address2': 'Ste. 1402',
    'city': 'New York',
    'postcode': '10018',
    'borough': 'MANHATTAN',
    'latitude': '40.7551',
    'longitude': '-73.992539',
    'community_board': '4',
    'council_district': '3',
    'census_tract': '115',
    'bin': '1013642',
    'bbl': '1007620019',
    'nta': 'Clinton                                                                    '
  }
  , {'company_name': 'Bluum Inc.', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Bluwired', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'BoSoul', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Board Vitals',
    'address': '271 W 47th Street ',
    'address2': '#24F',
    'city': 'New York',
    'postcode': '10036',
    'borough': 'MANHATTAN',
    'latitude': '40.760048',
    'longitude': '-73.986608',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '125',
    'bin': '1086225',
    'bbl': '1010190001',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': 'Boardvitals.com',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Bodian Associates',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Body&Eden', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'BodyMind Kitchen',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Bodytone Health Program',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Boloro', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Bolster', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Bolt Digital',
    'address': '73 Wortman Ave',
    'address2': ' - ',
    'city': 'Brooklyn',
    'postcode': '11207',
    'borough': 'BROOKLYN ',
    'latitude': '40.65485',
    'longitude': '-73.889865',
    'community_board': '5',
    'council_district': '42',
    'census_tract': '1104',
    'bin': '3097771',
    'bbl': '3043670015',
    'nta': 'East New York                                                              '
  }
  , {
    'company_name': 'Bombfell',
    'address': '262 W 38th Street',
    'address2': 'Room 702',
    'city': 'New York',
    'postcode': '10018',
    'borough': 'MANHATTAN',
    'latitude': '40.754216',
    'longitude': '-73.990478',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '109',
    'bin': '1014468',
    'bbl': '1007870076',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {'company_name': 'BondX', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'BondsOdds.com',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Bondsy',
    'address': '125 Court Street',
    'address2': 'Apartment 4HN',
    'city': 'Brooklyn',
    'postcode': '11201',
    'borough': 'BROOKLYN ',
    'latitude': '40.690112',
    'longitude': '-73.99215',
    'community_board': '2',
    'council_district': '33',
    'census_tract': '9',
    'bin': '3388736',
    'bbl': '3002777501',
    'nta': 'Brooklyn Heights-Cobble Hill                                               '
  }
  , {
    'company_name': 'Bonnie Young',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Bonobos',
    'address': '45 West 25th Street',
    'address2': '5th Floor',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.743556',
    'longitude': '-73.990364',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '58',
    'bin': '1015611',
    'bbl': '1008270008',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Bonus.ly',
    'address': ' - ',
    'address2': ' - ',
    'city': 'New York'
  }
  , {'company_name': 'Bonusly', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Boos Bakes',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Book&Table', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'BookaLokal Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Booker Software, Inc.',
    'address': '22 Cortlandt Street',
    'address2': 'Floor 18',
    'city': 'New York',
    'postcode': '10007',
    'borough': 'MANHATTAN',
    'latitude': '40.710223',
    'longitude': '-74.010897',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '13',
    'bin': '1001069',
    'bbl': '1000630003',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {
    'company_name': 'Bookish',
    'address': '7 West 18th Street',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10011',
    'borough': 'MANHATTAN',
    'latitude': '40.738774',
    'longitude': '-73.992415',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '54',
    'bin': '1015449',
    'bbl': '1008200033',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {'company_name': 'Bookspan', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Boom', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'BoomerPPL LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Bootstrap Software',
    'address': '129 West 29th Street',
    'address2': '12th Fl.',
    'city': 'New York',
    'postcode': '10001',
    'borough': 'MANHATTAN',
    'latitude': '40.747085',
    'longitude': '-73.991057',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '95',
    'bin': '1015143',
    'bbl': '1008050022',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': 'Booty SlideÂ¬Ã† Fitness',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'BoozBucks', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Booze & Shoes',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Boredom Therapy',
    'address': '349 5th Avenue',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10016',
    'borough': 'MANHATTAN',
    'latitude': '40.748183',
    'longitude': '-73.984517',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '74',
    'bin': '1017096',
    'bbl': '1008630081',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': 'Born In SKin',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Boston Biomotion',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'BotFactory', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Botego',
    'address': '244 5th Avenue',
    'address2': 'Suite K-271',
    'city': 'New York',
    'postcode': '10001',
    'borough': 'MANHATTAN',
    'latitude': '40.744521',
    'longitude': '-73.987427',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '58',
    'bin': '1015690',
    'bbl': '1008290040',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {'company_name': 'Botego Inc', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Bounce Exchange',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Boundless Impact Investing',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Bowery Financial',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'BoxKit', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Boxee',
    'address': '122 West 26th Street',
    'address2': '8th Floor',
    'city': 'New York',
    'postcode': '10001',
    'borough': 'MANHATTAN',
    'latitude': '40.745164',
    'longitude': '-73.992295',
    'community_board': '4',
    'council_district': '3',
    'census_tract': '91',
    'bin': '1015021',
    'bbl': '1008010055',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Boxing For All',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Boyle Software, Inc.',
    'address': '42 West 24th Street',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.74276',
    'longitude': '-73.990437',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '58',
    'bin': '1015587',
    'bbl': '1008250071',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'BrainGig Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'BrainTracer',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Brainscape', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Braintech', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Braintive', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Brake For Life',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Branch',
    'address': '416 W 13th St.',
    'address2': 'Suite 203',
    'city': 'New York',
    'postcode': '10014',
    'borough': 'MANHATTAN',
    'latitude': '40.740569',
    'longitude': '-74.006615',
    'community_board': '2',
    'council_district': '3',
    'census_tract': '79',
    'bin': '1080266',
    'bbl': '1006450029',
    'nta': 'West Village                                                               '
  }
  , {'company_name': 'Branchly', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Brand Labs NY, Inc.',
    'address': '390 Broadway',
    'address2': '4 floor',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.718345',
    'longitude': '-74.002763',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '31',
    'bin': '1002320',
    'bbl': '1001950004',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Brand Networks',
    'address': '175 Varick Street',
    'address2': '6th Floor',
    'city': 'New York',
    'postcode': '10014',
    'borough': 'MANHATTAN',
    'latitude': '40.727392',
    'longitude': '-74.005517',
    'community_board': '2',
    'council_district': '3',
    'census_tract': '37',
    'bin': '1009754',
    'bbl': '1005800065',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'BrandGames',
    'address': '636 Broadway',
    'address2': 'Suite 1100',
    'city': 'New York',
    'postcode': '10012',
    'borough': 'MANHATTAN',
    'latitude': '40.726247',
    'longitude': '-73.996067',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '5502',
    'bin': '1008213',
    'bbl': '1005220012',
    'nta': 'West Village                                                               '
  }
  , {
    'company_name': 'BrandReach',
    'address': '89 5th Avenue 7th Floor',
    'address2': 'Suite 703',
    'city': 'New York',
    'postcode': '10003',
    'borough': 'MANHATTAN',
    'latitude': '40.73758',
    'longitude': '-73.992458',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '52',
    'bin': '1016081',
    'bbl': '1008440003',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'BrandShare',
    'address': '263 West 38th Street',
    'address2': '8th Floor',
    'city': 'New York',
    'postcode': '10018',
    'borough': 'MANHATTAN',
    'latitude': '40.75423',
    'longitude': '-73.990468',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '113',
    'bin': '1014474',
    'bbl': '1007880011',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': 'BrandYourself.com',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Brandemix',
    'address': '1270 Broadway',
    'address2': '803',
    'city': 'New York',
    'postcode': '10001',
    'borough': 'MANHATTAN',
    'latitude': '40.748655',
    'longitude': '-73.988097',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '76',
    'bin': '1015858',
    'bbl': '1008340080',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': 'Brandt Works Inc.',
    'address': '611 Broadway #504',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10012',
    'borough': 'MANHATTAN',
    'latitude': '40.725699',
    'longitude': '-73.996558',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '5501',
    'bin': '1008240',
    'bbl': '1005230048',
    'nta': 'West Village                                                               '
  }
  , {
    'company_name': 'Brazilian Biologics',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Breadboye Entertainment',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Breadcrumb (apart of Groupon)',
    'address': '10 East 23rd Street',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.741178',
    'longitude': '-73.988726',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '56',
    'bin': '1016303',
    'bbl': '1008510063',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Break The Crates',
    'address': '902 Broadway',
    'address2': '4th Floor',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.739279',
    'longitude': '-73.989726',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '52',
    'bin': '1016201',
    'bbl': '1008490016',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Breakfast',
    'address': '55 Washington St',
    'address2': '#253b',
    'city': 'Brooklyn',
    'postcode': '11201',
    'borough': 'BROOKLYN ',
    'latitude': '40.70273',
    'longitude': '-73.989602',
    'community_board': '2',
    'council_district': '33',
    'census_tract': '21',
    'bin': '3000088',
    'bbl': '3000380001',
    'nta': 'DUMBO-Vinegar Hill-Downtown Brooklyn-Boerum Hill                           '
  }
  , {
    'company_name': 'Breaking Media',
    'address': '611 Broadway',
    'address2': 'Suite 907D',
    'city': 'New York',
    'postcode': '10012',
    'borough': 'MANHATTAN',
    'latitude': '40.725699',
    'longitude': '-73.996558',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '5501',
    'bin': '1008240',
    'bbl': '1005230048',
    'nta': 'West Village                                                               '
  }
  , {
    'company_name': 'Breakneck Apparel',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Breakrs', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Breather',
    'address': '235 E 13th St',
    'address2': 'Apt 6L',
    'city': 'New York',
    'postcode': '10003',
    'borough': 'MANHATTAN',
    'latitude': '40.732239',
    'longitude': '-73.986798',
    'community_board': '3',
    'council_district': '2',
    'census_tract': '40',
    'bin': '1006916',
    'bbl': '1004690046',
    'nta': 'East Village                                                               '
  }
  , {
    'company_name': 'Breefly.com',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Brentmoor Restaurant Advisors LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Brevity', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Brewla, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Brick & Portal',
    'address': '626 10th Avenue',
    'address2': '#5E',
    'city': 'New York',
    'postcode': '10036',
    'borough': 'MANHATTAN',
    'latitude': '40.761262',
    'longitude': '-73.994271',
    'community_board': '4',
    'council_district': '3',
    'census_tract': '121',
    'bin': '1026399',
    'bbl': '1010540001',
    'nta': 'Clinton                                                                    '
  }
  , {'company_name': 'CareBlue', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'BrideClick, Inc',
    'address': '120 W31st St.',
    'address2': 'Floor 6',
    'city': 'New York',
    'postcode': '10001',
    'borough': 'MANHATTAN',
    'latitude': '40.748241',
    'longitude': '-73.990003',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '101',
    'bin': '1015170',
    'bbl': '1008060054',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': 'Bridgeline Digital',
    'address': '450 7th Ave',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10123',
    'borough': 'MANHATTAN',
    'latitude': '40.751359',
    'longitude': '-73.990367',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '109',
    'bin': '1014408',
    'bbl': '1007840041',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {'company_name': 'Brif', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Bright Power',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Bright Starts of CNY',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'BrightBod', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'BrightLot Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'BrightWire',
    'address': '12 desbrosses',
    'address2': ' - ',
    'city': 'New York'
  }
  , {'company_name': 'BrightZoo', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Brightidea Inc.',
    'address': '810 7th Avenue',
    'address2': '11',
    'city': 'New York',
    'postcode': '10019',
    'borough': 'MANHATTAN',
    'latitude': '40.762639',
    'longitude': '-73.982146',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '131',
    'bin': '1024828',
    'bbl': '1010240038',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': 'Brightline',
    'address': '565 Fifth Avenue',
    'address2': '18th Floor',
    'city': 'New York',
    'postcode': '10017',
    'borough': 'MANHATTAN',
    'latitude': '40.755883',
    'longitude': '-73.978506',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '94',
    'bin': '1035402',
    'bbl': '1012820001',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': 'Brillist, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'BringMeThat',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Cinchcast', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Brinkmat', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'BriteRise Systems, LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Brivea Inc', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Broadcastr',
    'address': '325 Gold St.',
    'address2': ' - ',
    'city': 'Brooklyn',
    'postcode': '11201',
    'borough': 'BROOKLYN ',
    'latitude': '40.694575',
    'longitude': '-73.983267',
    'community_board': '2',
    'council_district': '35',
    'census_tract': '15',
    'bin': '3332462',
    'bbl': '3020490008',
    'nta': 'DUMBO-Vinegar Hill-Downtown Brooklyn-Boerum Hill                           '
  }
  , {
    'company_name': 'Broadway Technology',
    'address': '11 Broadway',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10004',
    'borough': 'MANHATTAN',
    'latitude': '40.705354',
    'longitude': '-74.013731',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '13',
    'bin': '1000044',
    'bbl': '1000130005',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {'company_name': 'Brode', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Broncks Consulting Group, Inc',
    'address': '400 E Fordham Rd',
    'address2': 'Fl 7',
    'city': 'Bronx',
    'postcode': '10458',
    'borough': 'BRONX    ',
    'latitude': '40.861668',
    'longitude': '-73.891337',
    'community_board': '6',
    'council_district': '15',
    'census_tract': '38302',
    'bin': '2116415',
    'bbl': '2030337501',
    'nta': 'Fordham South                                                              '
  }
  , {
    'company_name': 'Bronx Basketball Association',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Bronx Holy Flames',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Broodr', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Brooklyn Digital Foundry',
    'address': '20 Jay Street',
    'address2': 'Suite 115',
    'city': 'Brooklyn',
    'postcode': '11201',
    'borough': 'BROOKLYN ',
    'latitude': '40.704313',
    'longitude': '-73.986587',
    'community_board': '2',
    'council_district': '33',
    'census_tract': '21',
    'bin': '3000010',
    'bbl': '3000190001',
    'nta': 'DUMBO-Vinegar Hill-Downtown Brooklyn-Boerum Hill                           '
  }
  , {
    'company_name': 'Brooklyn Leather',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Brooklyn Research',
    'address': '630 Flushing Ave',
    'address2': 'FL 6',
    'city': 'Brooklyn',
    'postcode': '11206',
    'borough': 'BROOKLYN ',
    'latitude': '40.699963',
    'longitude': '-73.948449',
    'community_board': '3',
    'council_district': '36',
    'census_tract': '257',
    'bin': '3329628',
    'bbl': '3017200001',
    'nta': 'Bedford                                                                    '
  }
  , {
    'company_name': 'Brooklyn Taco Company, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Brooklyn Translation Works LLC',
    'address': ' - ',
    'address2': 'c/o Brooklyn Creative League',
    'city': 'Brooklyn'
  }
  , {
    'company_name': 'Brooklyn United (in association w/ Brooklyn Digital Foundry)',
    'address': '20 Jay St #1105',
    'address2': ' - ',
    'city': 'Brooklyn',
    'postcode': '11201',
    'borough': 'BROOKLYN ',
    'latitude': '40.704313',
    'longitude': '-73.986587',
    'community_board': '2',
    'council_district': '33',
    'census_tract': '21',
    'bin': '3000010',
    'bbl': '3000190001',
    'nta': 'DUMBO-Vinegar Hill-Downtown Brooklyn-Boerum Hill                           '
  }
  , {'company_name': 'Brouha', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Brown Belt', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'BrunchCritic',
    'address': '175 Varick St.',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10014',
    'borough': 'MANHATTAN',
    'latitude': '40.727392',
    'longitude': '-74.005517',
    'community_board': '2',
    'council_district': '3',
    'census_tract': '37',
    'bin': '1009754',
    'bbl': '1005800065',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Bubba & Shirley Trading Co.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Bubbl', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Bubble', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Bubble News',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Bubblerock Entertainment',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Buddy Media (Sales Force Marketing Cloud)',
    'address': '155 6th Avenue',
    'address2': '12th Flr',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.725248',
    'longitude': '-74.004412',
    'community_board': '2',
    'council_district': '3',
    'census_tract': '37',
    'bin': '1007385',
    'bbl': '1004910046',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {'company_name': 'Budge, Inc', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Buffalo Forklift LLC (Own Real Assets)',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Bug Labs',
    'address': '598 Broadway',
    'address2': '4th Floor',
    'city': 'New York',
    'postcode': '10012',
    'borough': 'MANHATTAN',
    'latitude': '40.725045',
    'longitude': '-73.997085',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '43',
    'bin': '1007945',
    'bbl': '1005110015',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Build Long Island',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'BuilderBuzz',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Building Link',
    'address': '85 Fifth Avenue',
    'address2': '3rd Floor',
    'city': 'New York',
    'postcode': '10003',
    'borough': 'MANHATTAN',
    'latitude': '40.737416',
    'longitude': '-73.992581',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '52',
    'bin': '1016080',
    'bbl': '1008440001',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Built by the Factory',
    'address': '261 Madison Avenue',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10016',
    'borough': 'MANHATTAN',
    'latitude': '40.750806',
    'longitude': '-73.98073',
    'community_board': '6',
    'council_district': '4',
    'census_tract': '82',
    'bin': '1017231',
    'bbl': '1008680025',
    'nta': 'Murray Hill-Kips Bay                                                       '
  }
  , {
    'company_name': 'Bulb Master Inc',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Bull Moose Brewing',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'BumpUp', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Bundle Organics',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'BundleNYC',
    'address': '128 Thompson Street',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10012',
    'borough': 'MANHATTAN',
    'latitude': '40.726401',
    'longitude': '-74.001353',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '49',
    'bin': '1008022',
    'bbl': '1005160002',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Bunker New York',
    'address': '28 Howard St',
    'address2': '3rd Floor',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.719506',
    'longitude': '-74.000498',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '45',
    'bin': '1003053',
    'bbl': '1002330033',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Bunny Inc. (VoiceBunny)',
    'address': '902 Broadway Ave.',
    'address2': '4th Floor',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.739279',
    'longitude': '-73.989726',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '52',
    'bin': '1016201',
    'bbl': '1008490016',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Bureau Blank',
    'address': '273 Grand Street',
    'address2': 'Floor 6',
    'city': 'New York',
    'postcode': '10002',
    'borough': 'MANHATTAN',
    'latitude': '40.717854',
    'longitude': '-73.992901',
    'community_board': '3',
    'council_district': '1',
    'census_tract': '16',
    'bin': '1003958',
    'bbl': '1003060016',
    'nta': 'Chinatown                                                                  '
  }
  , {
    'company_name': 'Burnout Brooklyn',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Burringo', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Burst Media',
    'address': '1156 Avenue of the Americas',
    'address2': 'Suite 301',
    'city': 'New York',
    'postcode': '10036',
    'borough': 'MANHATTAN',
    'latitude': '40.756622',
    'longitude': '-73.982808',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '96',
    'bin': '1034240',
    'bbl': '1012600071',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {'company_name': 'BusGenie', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Bushel Entertainment',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Business Insider',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Business Management Consortium, LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Business Mentor NY',
    'address': '253 W 16th St',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10011',
    'borough': 'MANHATTAN',
    'latitude': '40.740512',
    'longitude': '-74.000188',
    'community_board': '4',
    'council_district': '3',
    'census_tract': '81',
    'bin': '1013795',
    'bbl': '1007660009',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'BusinessReel',
    'address': '28 Howard St',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.719506',
    'longitude': '-74.000498',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '45',
    'bin': '1003053',
    'bbl': '1002330033',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'BusinessWeek.com (acquired by Bloombergs)',
    'address': '731 Lexington Ave',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10022',
    'borough': 'MANHATTAN',
    'latitude': '40.761887',
    'longitude': '-73.968421',
    'community_board': '6',
    'council_district': '4',
    'census_tract': '11203',
    'bin': '1086160',
    'bbl': '1013137501',
    'nta': 'Turtle Bay-East Midtown                                                    '
  }
  , {'company_name': 'Busker', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'BustedTees',
    'address': '54 West 22nd Street',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.741588',
    'longitude': '-73.991776',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '58',
    'bin': '1015551',
    'bbl': '1008230072',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {'company_name': 'Bustr', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Butter Beans, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Buy Me A Drink',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'BuyFolio (AgentFolio) (acquired by Zillow)',
    'address': '305 W Broadway',
    'address2': 'Suite 227',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.721595',
    'longitude': '-74.004419',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '47',
    'bin': '1002959',
    'bbl': '1002280010',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Buyology Inc',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Buyou', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'BuzzBuzzHome Corp.',
    'address': '175 Varick St.',
    'address2': '4',
    'city': 'New York',
    'postcode': '10014',
    'borough': 'MANHATTAN',
    'latitude': '40.727392',
    'longitude': '-74.005517',
    'community_board': '2',
    'council_district': '3',
    'census_tract': '37',
    'bin': '1009754',
    'bbl': '1005800065',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {'company_name': 'BuzzFeed', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'BuzzTable', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Buzzr',
    'address': '38 W 21st St',
    'address2': '3rd Flr',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.740816',
    'longitude': '-73.991848',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '54',
    'bin': '1015508',
    'bbl': '1008220062',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {'company_name': 'Buzztala', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Byte Dept.',
    'address': '148 Madison Ave',
    'address2': '#600',
    'city': 'New York',
    'postcode': '10016',
    'borough': 'MANHATTAN',
    'latitude': '40.746335',
    'longitude': '-73.984012',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '74',
    'bin': '1017000',
    'bbl': '1008610064',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': 'ByteFly, Inc.',
    'address': '217 Water Street',
    'address2': 'Suite 201',
    'city': 'New York',
    'postcode': '10038',
    'borough': 'MANHATTAN',
    'latitude': '40.707525',
    'longitude': '-74.003365',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '1501',
    'bin': '1082012',
    'bbl': '1000960005',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {'company_name': 'Bytemark', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'C M INNOVATION',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'C&C Entertainment Firm',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'C&C Graphics',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'C-EDI Inc.', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'C-Suite Mentor',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'C-vibes',
    'address': '154 Grand St',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.719976',
    'longitude': '-73.9989',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '45',
    'bin': '1007009',
    'bbl': '1004720028',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'C.M. Cherry International LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'C.TrAm', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'C3 Metrics',
    'address': '1230 Avenue of the Americas',
    'address2': '7th Floor',
    'city': 'New York',
    'postcode': '10020',
    'borough': 'MANHATTAN',
    'latitude': '40.758977',
    'longitude': '-73.981089',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '96',
    'bin': '1077287',
    'bbl': '1012640005',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {'company_name': 'CA-Speak', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'CADRE (Next Street)',
    'address': '37 West 20th Street',
    'address2': 'Suite 1101',
    'city': 'New York',
    'postcode': '10011',
    'borough': 'MANHATTAN',
    'latitude': '40.740232',
    'longitude': '-73.992252',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '54',
    'bin': '1015489',
    'bbl': '1008220009',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'CALM Energy',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'CAPPTURE', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'CARality', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'CASE',
    'address': '125 Maiden Lane',
    'address2': 'Suite 14A',
    'city': 'New York',
    'postcode': '10038',
    'borough': 'MANHATTAN',
    'latitude': '40.706397',
    'longitude': '-74.006341',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '1502',
    'bin': '1087484',
    'bbl': '1000707501',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {'company_name': 'CASH COACH', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'CASTNREEL, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'CBS Interactive',
    'address': '28 East 28th Street',
    'address2': '10th floor',
    'city': 'New York',
    'postcode': '10016',
    'borough': 'MANHATTAN',
    'latitude': '40.743876',
    'longitude': '-73.985406',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '56',
    'bin': '1016889',
    'bbl': '1008570024',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {'company_name': 'CBSEE', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'CD Trade', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'CH Media (College Humor Media)',
    'address': '555 West 18th Street',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10011',
    'borough': 'MANHATTAN',
    'latitude': '40.745134',
    'longitude': '-74.007525',
    'community_board': '4',
    'council_district': '3',
    'census_tract': '99',
    'bin': '1012280',
    'bbl': '1006900012',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'CHIPS NY',
    'address': ' - ',
    'address2': ' - ',
    'city': 'Brooklyn'
  }
  , {'company_name': 'CHIYOME', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'CHOICE Financial Solutions',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'CHRISTIAN COTA INTERNATIONAL LLC.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'CIG, LLC', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'CLEARGOALS',
    'address': '105 W 86TH ST',
    'address2': '227',
    'city': 'New York',
    'postcode': '10024',
    'borough': 'MANHATTAN',
    'latitude': '40.786604',
    'longitude': '-73.972433',
    'community_board': '7',
    'council_district': '6',
    'census_tract': '173',
    'bin': '1032199',
    'bbl': '1012170029',
    'nta': 'Upper West Side                                                            '
  }
  , {'company_name': 'CLPinc.', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'CMP.LY', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'CNEKT', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'COAWAY LLC', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'COLLIDR', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'CONEY  ISLAND  ICE CREAM',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'COOKING LESSONS IN FRANCE',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'CORP Online LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'CRT/tanaka',
    'address': ' - ',
    'address2': ' - ',
    'city': 'New York'
  }
  , {'company_name': 'CS Int', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'CSBM', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'CSRHub LLC', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'CURA Physical and Massage Therapy,LLP',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'CabCorner LLC',
    'address': '46 President Street',
    'address2': '1st Floor',
    'city': 'Brooklyn',
    'postcode': '11231',
    'borough': 'BROOKLYN ',
    'latitude': '40.684115',
    'longitude': '-74.004774',
    'community_board': '6',
    'council_district': '39',
    'census_tract': '51',
    'bin': '3401409',
    'bbl': '3003477503',
    'nta': 'Carroll Gardens-Columbia Street-Red Hook                                   '
  }
  , {'company_name': 'CabEasy', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Caboost', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Caeden, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Cafe Empire',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'CafeMom',
    'address': '401 Park Ave S Fl 5',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10016',
    'borough': 'MANHATTAN',
    'latitude': '40.743228',
    'longitude': '-73.984132',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '68',
    'bin': '1018203',
    'bbl': '1008830088',
    'nta': 'Gramercy                                                                   '
  }
  , {
    'company_name': 'Cake Group',
    'address': '195 Broadway',
    'address2': '12th Floor',
    'city': 'New York',
    'postcode': '10007',
    'borough': 'MANHATTAN',
    'latitude': '40.710536',
    'longitude': '-74.009378',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '13',
    'bin': '1001227',
    'bbl': '1000800001',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {'company_name': 'CalPal', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Calcbench, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Calcorie', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'CallSeniorCare.com',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Callision', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Calvin', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Camayak',
    'address': '230 W 38th Street',
    'address2': 'Flr 9',
    'city': 'New York',
    'postcode': '10018',
    'borough': 'MANHATTAN',
    'latitude': '40.753942',
    'longitude': '-73.989829',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '109',
    'bin': '1014462',
    'bbl': '1007870059',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': 'Camille Zarsky Handbags',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Campalyst Inc',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Campfire',
    'address': '313 Church Street',
    'address2': '2nd Floor',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.719778',
    'longitude': '-74.004113',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '33',
    'bin': '1002297',
    'bbl': '1001940019',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Campus Dining Delivery',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Campus Job',
    'address': '55 E 52nd St. ',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10055',
    'borough': 'MANHATTAN',
    'latitude': '40.758828',
    'longitude': '-73.973978',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '102',
    'bin': '1083869',
    'bbl': '1012880027',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': 'Canada Debt relief',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Canal', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'CandidShots4u',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'CannRx Technology, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Canvas',
    'address': '104 Fifth Avenue',
    'address2': '10H Flr',
    'city': 'New York',
    'postcode': '10011',
    'borough': 'MANHATTAN',
    'latitude': '40.737059',
    'longitude': '-73.992862',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '54',
    'bin': '1080621',
    'bbl': '1008177502',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Canvas Squared',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Canvita', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Canvs+', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Capital Gain Advisor',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'CatchEye', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Capital New York',
    'address': '333 West 39th St.',
    'address2': 'Suite 902',
    'city': 'New York',
    'postcode': '10018',
    'borough': 'MANHATTAN',
    'latitude': '40.755792',
    'longitude': '-73.99225',
    'community_board': '4',
    'council_district': '3',
    'census_tract': '115',
    'bin': '1013681',
    'bbl': '1007630018',
    'nta': 'Clinton                                                                    '
  }
  , {
    'company_name': 'Capture Your Flag',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Car Part Kings',
    'address': ' - ',
    'address2': ' - ',
    'city': 'New York'
  }
  , {
    'company_name': 'Caravan Interactive',
    'address': '68 Jay St #1002',
    'address2': ' - ',
    'city': 'Brooklyn',
    'postcode': '11201',
    'borough': 'BROOKLYN ',
    'latitude': '40.702763',
    'longitude': '-73.986681',
    'community_board': '2',
    'council_district': '33',
    'census_tract': '21',
    'bin': '3000090',
    'bbl': '3000400001',
    'nta': 'DUMBO-Vinegar Hill-Downtown Brooklyn-Boerum Hill                           '
  }
  , {'company_name': 'Carbon38', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Carbonmade',
    'address': '187 Lafayette St.',
    'address2': '4th Floor',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.720753',
    'longitude': '-73.998445',
    'community_board': '2',
    'council_district': '1',
    'census_tract': '45',
    'bin': '1007001',
    'bbl': '1004720010',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {'company_name': 'CardSpark', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Care Innovations LLC',
    'address': '29 W 35th St',
    'address2': '12th floor',
    'city': 'New York',
    'postcode': '10001',
    'borough': 'MANHATTAN',
    'latitude': '40.74961',
    'longitude': '-73.985267',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '84',
    'bin': '1015891',
    'bbl': '1008370023',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': 'CareGuardian',
    'address': '740 Broadway',
    'address2': '#1203',
    'city': 'New York',
    'postcode': '10003',
    'borough': 'MANHATTAN',
    'latitude': '40.729884',
    'longitude': '-73.992993',
    'community_board': '2',
    'council_district': '2',
    'census_tract': '57',
    'bin': '1080092',
    'bbl': '1005450026',
    'nta': 'West Village                                                               '
  }
  , {
    'company_name': 'CarePlanners',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Career Quad  STUDIOS',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'CareerApp', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'CareerThesaurus',
    'address': '65 15th Street ',
    'address2': '#2F',
    'city': 'Brooklyn',
    'postcode': '11215',
    'borough': 'BROOKLYN ',
    'latitude': '40.668272',
    'longitude': '-73.994881',
    'community_board': '6',
    'council_district': '39',
    'census_tract': '117',
    'bin': '3023588',
    'bbl': '3010390055',
    'nta': 'Park Slope-Gowanus                                                         '
  }
  , {
    'company_name': 'Careeref, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Careeris', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Carette International',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'CariCorps',
    'address': '601 West 26th Street',
    'address2': 'Suite 325',
    'city': 'New York',
    'postcode': '10001',
    'borough': 'MANHATTAN',
    'latitude': '40.750934',
    'longitude': '-74.005955',
    'community_board': '4',
    'council_district': '3',
    'census_tract': '99',
    'bin': '1012268',
    'bbl': '1006720001',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {'company_name': 'Caritas', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Carpathia Hosting',
    'address': '1500 Broadway Avenue',
    'address2': '1811',
    'city': 'New York',
    'postcode': '10036',
    'borough': 'MANHATTAN',
    'latitude': '40.756856',
    'longitude': '-73.985973',
    'community_board': '5',
    'council_district': '4',
    'census_tract': '119',
    'bin': '1022610',
    'bbl': '1009960001',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': 'CarpeCultum',
    'address': '20 River Terrace',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10282',
    'borough': 'MANHATTAN',
    'latitude': '40.716942',
    'longitude': '-74.016298',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '31703',
    'bin': '1086174',
    'bbl': '1000160180',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {
    'company_name': 'Carrot Creative',
    'address': '45 Main St.',
    'address2': 'Suite 1200',
    'city': 'New York'
  }
  , {
    'company_name': 'CartRescue911 LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Cartonomy',
    'address': '105 Madison Ave',
    'address2': '9th Floor',
    'city': 'New York',
    'postcode': '10016',
    'borough': 'MANHATTAN',
    'latitude': '40.744889',
    'longitude': '-73.985041',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '74',
    'bin': '1016939',
    'bbl': '1008590064',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': 'Cartoon Brew',
    'address': 'PO Box 15054',
    'address2': ' - ',
    'city': 'Brooklyn'
  }
  , {
    'company_name': 'Cartoon Encyclopedia',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'CartridgeExpert',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'CarusoApps',
    'address': '383 Brookfield Ave',
    'address2': ' - ',
    'city': 'Staten Island'
  }
  , {
    'company_name': 'Case Commons',
    'address': '841 Broadway',
    'address2': '8th Floor',
    'city': 'New York',
    'postcode': '10003',
    'borough': 'MANHATTAN',
    'latitude': '40.734243',
    'longitude': '-73.990896',
    'community_board': '2',
    'council_district': '2',
    'census_tract': '61',
    'bin': '1080132',
    'bbl': '1005650015',
    'nta': 'West Village                                                               '
  }
  , {
    'company_name': 'Case Tracker',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'CaseRails', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Caskers', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Casserole Labs',
    'address': '231 Front Street',
    'address2': '3',
    'city': 'Brooklyn',
    'postcode': '11201',
    'borough': 'BROOKLYN ',
    'latitude': '40.702337',
    'longitude': '-73.983976',
    'community_board': '2',
    'council_district': '33',
    'census_tract': '21',
    'bin': '3329427',
    'bbl': '3000420011',
    'nta': 'DUMBO-Vinegar Hill-Downtown Brooklyn-Boerum Hill                           '
  }
  , {
    'company_name': 'Casting to the People',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Castle Ridge Media',
    'address': '78 Ridge St',
    'address2': 'Suite 1D',
    'city': 'New York',
    'postcode': '10002',
    'borough': 'MANHATTAN',
    'latitude': '40.717707',
    'longitude': '-73.983828',
    'community_board': '3',
    'council_district': '1',
    'census_tract': '12',
    'bin': '1075794',
    'bbl': '1003437501',
    'nta': 'Lower East Side                                                            '
  }
  , {'company_name': 'Cat2See', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Catalyst Global LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Catalyst Online',
    'address': '498 7th Avenue',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10018',
    'borough': 'MANHATTAN',
    'latitude': '40.752808',
    'longitude': '-73.98932',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '109',
    'bin': '1014445',
    'bbl': '1007860051',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {'company_name': 'Catchafire', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Catchafire',
    'address': '31 East 32nd Street',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10016',
    'borough': 'MANHATTAN',
    'latitude': '40.746352',
    'longitude': '-73.983572',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '74',
    'bin': '1017017',
    'bbl': '1008620026',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {
    'company_name': 'Catchpoint Systems',
    'address': '336 West 37th Street',
    'address2': 'SUITE 405',
    'city': 'New York',
    'postcode': '10018',
    'borough': 'MANHATTAN',
    'latitude': '40.754573',
    'longitude': '-73.99324',
    'community_board': '4',
    'council_district': '3',
    'census_tract': '111',
    'bin': '1013604',
    'bbl': '1007600063',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Categorical',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Cater2.me',
    'address': '40 West 29th St',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10001',
    'borough': 'MANHATTAN',
    'latitude': '40.746199',
    'longitude': '-73.988996',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '76',
    'bin': '1015741',
    'bbl': '1008300069',
    'nta': 'Midtown-Midtown South                                                      '
  }
  , {'company_name': 'CaterCow', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'CauseCart', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'CauseCart',
    'address': 'DUMBO',
    'address2': ' - ',
    'city': 'Brooklyn'
  }
  , {'company_name': 'CauseVox', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Cedar Grown Transportation',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Cellfish', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Centers for HER: Healing, Evaluation and Relationship',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Central E inc',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Centrallo', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Centric Digital',
    'address': '120 Fifth Ave ',
    'address2': '7th Floor ',
    'city': 'New York',
    'postcode': '10011',
    'borough': 'MANHATTAN',
    'latitude': '40.738091',
    'longitude': '-73.992108',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '54',
    'bin': '1015419',
    'bbl': '1008190037',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'CentricSocial',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Centzy', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Cessair Therapeutics',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'ChEucBa', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Chainbits', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Chalkable', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Challengage',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'ChallengePost, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Chamblu Entertainment, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'ChameleonJohn',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Citizen Spend',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Change.org',
    'address': '64 Fulton Street',
    'address2': '10th Floor',
    'city': 'New York',
    'postcode': '10038',
    'borough': 'MANHATTAN',
    'latitude': '40.708769',
    'longitude': '-74.005136',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '1502',
    'bin': '1001176',
    'bbl': '1000760001',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {
    'company_name': 'Chango',
    'address': '20 West 22nd St.',
    'address2': 'Suite 1001',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.741253',
    'longitude': '-73.990978',
    'community_board': '5',
    'council_district': '3',
    'census_tract': '58',
    'bin': '1015540',
    'bbl': '1008230055',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Characters for Hire, LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'ChargeUp', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Charged.fm', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Charideem, Inc',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Charitable Checkout',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Charitable.org',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Charity Miles',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'CharityTick',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Chart Prophet',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Chartbeat', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Chartbeat', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Chartered Capital Advisers, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Chat ID',
    'address': ' - ',
    'address2': ' - ',
    'city': 'New York'
  }
  , {
    'company_name': 'Chat.cc',
    'address': '440 E 20th st',
    'address2': '#11B',
    'city': 'New York',
    'postcode': '10009',
    'borough': 'MANHATTAN',
    'latitude': '40.734189',
    'longitude': '-73.978267',
    'community_board': '6',
    'council_district': '4',
    'census_tract': '44',
    'bin': '1082866',
    'bbl': '1009720001',
    'nta': 'Stuyvesant Town-Cooper Village                                             '
  }
  , {'company_name': 'Chatalog', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'CheapInTheCity.com',
    'address': '634 St. Nicholas Ave',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10030',
    'borough': 'MANHATTAN',
    'latitude': '40.821968',
    'longitude': '-73.945732',
    'community_board': '9',
    'council_district': '9',
    'census_tract': '227',
    'bin': '1061047',
    'bbl': '1020510020',
    'nta': 'Hamilton Heights                                                           '
  }
  , {'company_name': 'Cheapism', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Cheater Beater',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Cheekd, Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Cheeki Brand LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'CheetahMail (acquired by Experian)',
    'address': '29 Broadway, 6th floor',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10006',
    'borough': 'MANHATTAN',
    'latitude': '40.70601',
    'longitude': '-74.01315',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '13',
    'bin': '1000802',
    'bbl': '1000200001',
    'nta': 'Battery Park City-Lower Manhattan                                          '
  }
  , {'company_name': 'ChefPrive', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Chefday',
    'address': '1304 Willoughby Ave',
    'address2': ' - ',
    'city': 'Brooklyn',
    'postcode': '11237',
    'borough': 'BROOKLYN ',
    'latitude': '40.705237',
    'longitude': '-73.921824',
    'community_board': '4',
    'council_district': '34',
    'census_tract': '445',
    'bin': '3072972',
    'bbl': '3032100029',
    'nta': 'Bushwick North                                                             '
  }
  , {'company_name': 'Cherrysh', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Chez Tates', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Chia Charger',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Chic Sugars',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'ChicRebellion.tv',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'ChickRx',
    'address': '902 Broadway',
    'address2': ' - ',
    'city': 'New York',
    'postcode': '10010',
    'borough': 'MANHATTAN',
    'latitude': '40.739279',
    'longitude': '-73.989726',
    'community_board': '5',
    'council_district': '2',
    'census_tract': '52',
    'bin': '1016201',
    'bbl': '1008490016',
    'nta': 'Hudson Yards-Chelsea-Flatiron-Union Square                                 '
  }
  , {
    'company_name': 'Chiefofstaff.com, LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Chillaxing App',
    'address': '442 97th street',
    'address2': ' - ',
    'city': 'Brooklyn',
    'postcode': '11209',
    'borough': 'BROOKLYN ',
    'latitude': '40.614407',
    'longitude': '-74.031152',
    'community_board': '10',
    'council_district': '43',
    'census_tract': '162',
    'bin': '3350376',
    'bbl': '3061277502',
    'nta': 'Bay Ridge                                                                  '
  }
  , {
    'company_name': 'Chimpanzee',
    'address': '275 Madison Avenue',
    'address2': '14th Floor',
    'city': 'New York',
    'postcode': '10016',
    'borough': 'MANHATTAN',
    'latitude': '40.751261',
    'longitude': '-73.979868',
    'community_board': '6',
    'council_district': '4',
    'census_tract': '82',
    'bin': '1017597',
    'bbl': '1008690054',
    'nta': 'Murray Hill-Kips Bay                                                       '
  }
  , {
    'company_name': 'ChinaUScommerce.com',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'ChineseCUBES',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'ChipperSitter',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Chitta Wellness LLC',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Chloe + Isabel',
    'address': '122 Hudson St',
    'address2': '6th Flr',
    'city': 'New York',
    'postcode': '10013',
    'borough': 'MANHATTAN',
    'latitude': '40.72005',
    'longitude': '-74.008553',
    'community_board': '1',
    'council_district': '1',
    'census_tract': '33',
    'bin': '1002165',
    'bbl': '1001900016',
    'nta': 'SoHo-TriBeCa-Civic Center-Little Italy                                     '
  }
  , {
    'company_name': 'Chocolatania',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Chocomize', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Choozer', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Christopher Jarczynski',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Chromation', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Chronopix',
    'address': ' - ',
    'address2': ' - ',
    'city': 'New York'
  }
  , {
    'company_name': 'ChubbyBrain',
    'address': ' - ',
    'address2': ' - ',
    'city': 'New York'
  }
  , {'company_name': 'Chumfo', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Cidea Incorporated',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Cipherhealth',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {
    'company_name': 'Circcle Interactive',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }
  , {'company_name': 'Circles io', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Cirqa', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {'company_name': 'Cisse', 'address': ' - ', 'address2': ' - ', 'city': ' - '}
  , {
    'company_name': 'Citease Inc.',
    'address': ' - ',
    'address2': ' - ',
    'city': ' - '
  }];
