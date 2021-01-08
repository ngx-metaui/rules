export interface SupplierCSV {
  UniqueName: any;
  Name: string;
  CorporateURL: string;
  PaymentTerms: string;
  SupplierIDDomain: string;
  SupplierIDValue: string;
  PurchasingUnits: string;

  location?: SupplierLocationCSV;
}


export interface SupplierLocationCSV {
  UniqueName: any;
  Name: string;
  SupplierId: any;
  ContactID: Number;
  Contact: string;
  Lines: string;
  City: string;
  State: string;
  PostalCode: any;
  Country: string;
  Phone: string;
  Fax: any;
  EmailAddress: string;
}


export const supplierDB: Array<SupplierCSV> =
  [
    {
      UniqueName: 6,
      Name: 'Computer Electronics Supply (Manual - Fulfillment, ACP FT)',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid497',
      PurchasingUnits: ''
    },
    {
      UniqueName: 10,
      Name: 'Mantell Office Maintenance (MOM) Manual Supplier',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid495',
      PurchasingUnits: ''
    },
    {
      UniqueName: 11,
      Name: 'JCN Technologies (AN - Fulfillment FT)',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid496',
      PurchasingUnits: ''
    },
    {
      UniqueName: 24,
      Name: 'Universal Plant & Equipment Corp. (US100 US005)',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid494',
      PurchasingUnits: 'US100,US005'
    },
    {
      UniqueName: 29,
      Name: 'Schafer Office',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid498',
      PurchasingUnits: ''
    },
    {
      UniqueName: 70,
      Name: 'Barnes and Noble (All units) (AN - Punchout Supplier)',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid493',
      PurchasingUnits: 'DEU01,GBR01,US100,US005,SNG01,US002'
    },
    {
      UniqueName: 72,
      Name: 'Megaplex Office Equipment (MOE)',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid601',
      PurchasingUnits: ''
    },
    {
      UniqueName: 73,
      Name: 'John Woodman (Manual Supplier)',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid499',
      PurchasingUnits: ''
    },
    {
      UniqueName: 80,
      Name: '1-800-flowers.com (AN - Punchout Supplier)',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid480',
      PurchasingUnits: ''
    },
    {
      UniqueName: 157,
      Name: 'Hybrid Office Supplies',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid602',
      PurchasingUnits: ''
    },
    {
      UniqueName: 1000811,
      Name: 'Supplier 11 (AN - ACP FT)',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid489',
      PurchasingUnits: ''
    },
    {
      UniqueName: 1000812,
      Name: 'Supplier 12 (AN - ACP FT)',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid488',
      PurchasingUnits: ''
    },
    {
      UniqueName: 1000813,
      Name: 'Supplier 13 (AN - ACP FT)',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid487',
      PurchasingUnits: ''
    },
    {
      UniqueName: 1000814,
      Name: 'Supplier 14 (AN - ACP FT)',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid486',
      PurchasingUnits: ''
    },
    {
      UniqueName: 1000815,
      Name: 'Supplier 15 (AN - ACP FT)',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid485',
      PurchasingUnits: ''
    },
    {
      UniqueName: 1000816,
      Name: 'Kelly Services (AN - ACP FT)',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid484',
      PurchasingUnits: ''
    },
    {
      UniqueName: 1000817,
      Name: 'Best Staffing Inc. (AN - ACP FT)',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid483',
      PurchasingUnits: ''
    },
    {
      UniqueName: 1000818,
      Name: 'EZ Staffing',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid482',
      PurchasingUnits: ''
    },
    {
      UniqueName: 1000819,
      Name: 'Staffing R Us',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid481',
      PurchasingUnits: ''
    },
    {
      UniqueName: 'sid491',
      Name: 'Software House International',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid491',
      PurchasingUnits: 'All'
    },
    {
      UniqueName: 'sid501',
      Name: 'CMX Technology (AN - ACP FT)',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid501',
      PurchasingUnits: ''
    },
    {
      UniqueName: 'sid502',
      Name: 'ServerTech Inc.',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid502',
      PurchasingUnits: ''
    },
    {
      UniqueName: 'sid504',
      Name: 'Digi Storage (US002 US005 US100) (Manual Supplier)',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid504',
      PurchasingUnits: 'US002,US005,US100'
    },
    {
      UniqueName: 'sid505',
      Name: 'Network Equipment Solutions (Manual Supplier)',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid505',
      PurchasingUnits: ''
    },
    {
      UniqueName: 'sid508',
      Name: 'LanSoft Technologies (Manual Supplier)',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid508',
      PurchasingUnits: ''
    },
    {
      UniqueName: 'sid509',
      Name: 'Apex Corporation (AN Supplier)',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid509',
      PurchasingUnits: ''
    },
    {
      UniqueName: 'sid511',
      Name: 'Globe Printing Inc. (AN - Fulfillment, ACP FT)',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid511',
      PurchasingUnits: ''
    },
    {
      UniqueName: 'sid512',
      Name: 'Maximo Marketing Associates Inc. (AN - ACP FT)',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid512',
      PurchasingUnits: ''
    },
    {
      UniqueName: 'sid513',
      Name: 'Print Products Inc. (AN - Contracts FT)',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid513',
      PurchasingUnits: ''
    },
    {
      UniqueName: 'sid514',
      Name: 'Trinity Marcom Ltd.',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid514',
      PurchasingUnits: ''
    },
    {
      UniqueName: 'sid515',
      Name: 'EPrint Technologies (AN - Fulfillment, ACP FT)',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid515',
      PurchasingUnits: ''
    },
    {
      UniqueName: 'sid517',
      Name: 'Druid Business Consulting Inc.',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid517',
      PurchasingUnits: ''
    },
    {
      UniqueName: 'sid522',
      Name: 'Indus Consulting Inc. (AN - ACP FT)',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid522',
      PurchasingUnits: ''
    },
    {
      UniqueName: 'sid526',
      Name: 'Papyrus Corporation (AN - ACP FT)',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid526',
      PurchasingUnits: ''
    },
    {
      UniqueName: 'sid600',
      Name: 'Manpower (AN - Catalog FT)',
      CorporateURL: '',
      PaymentTerms: 'PT1',
      SupplierIDDomain: 'buyersystemid',
      SupplierIDValue: 'sid600',
      PurchasingUnits: 'All'
    }
  ];


export const supplierLocations: Array<SupplierLocationCSV> =

  [
    {
      UniqueName: 9,
      Name: 'Gerard Clondyke : SAN JOSE',
      SupplierId: 6,
      ContactID: 9,
      Contact: 'Gerard Clondyke',
      Lines: '180 Industrial Parkway',
      City: 'San Jose',
      State: 'CA',
      PostalCode: '79529-3340',
      Country: 'US',
      Phone: '(408)412-5679',
      Fax: '',
      EmailAddress: ''
    },
    {
      UniqueName: 9,
      Name: 'Ronald Raster : SAN JOSE',
      SupplierId: 6,
      ContactID: 64,
      Contact: 'Ronald Raster',
      Lines: '180 Industrial Parkway',
      City: 'San Jose',
      State: 'CA',
      PostalCode: '79529-3340',
      Country: 'US',
      Phone: '(408)412-5679',
      Fax: '',
      EmailAddress: ''
    },
    {
      UniqueName: 13,
      Name: 'Marty Washer : TUSCON',
      SupplierId: 10,
      ContactID: 13,
      Contact: 'Marty Washer',
      Lines: '12324 Desert Way',
      City: 'Tuscon',
      State: 'AZ',
      PostalCode: 55719,
      Country: 'US',
      Phone: '(602)465-7657',
      Fax: '',
      EmailAddress: ''
    },
    {
      UniqueName: 14,
      Name: 'Fritz Lohr : STUTTGART',
      SupplierId: 11,
      ContactID: 63,
      Contact: 'Fritz Lohr',
      Lines: 'Schelmenwasenstrasse 40',
      City: 'Stuttgart',
      State: '',
      PostalCode: 7000,
      Country: 'DE',
      Phone: '(1)172-435-7982',
      Fax: 5434180,
      EmailAddress: ''
    },
    {
      UniqueName: 15,
      Name: 'Phil Brinkley : BRACKNELL',
      SupplierId: 10,
      ContactID: 14,
      Contact: 'Phil Brinkley',
      Lines: '123 Guilford Lane Whatling Road',
      City: 'Bracknell',
      State: '',
      PostalCode: 'DF3 2DF',
      Country: 'GB',
      Phone: '32-843-1486',
      Fax: 5434180,
      EmailAddress: 'mathew@ariba.com'
    },
    {
      UniqueName: 29,
      Name: 'Bruce Owens : DETROIT',
      SupplierId: 24,
      ContactID: 28,
      Contact: 'Bruce Owens',
      Lines: '310 Lafayette',
      City: 'Detroit',
      State: 'MI',
      PostalCode: 39254,
      Country: 'US',
      Phone: '(313)457-1254',
      Fax: '(408)5434180',
      EmailAddress: ''
    },
    {
      UniqueName: 36,
      Name: 'Blaine Powell : BIRMINGHAM',
      SupplierId: 29,
      ContactID: 34,
      Contact: 'Blaine Powell',
      Lines: '1818 River Road',
      City: 'Birmingham',
      State: '',
      PostalCode: 'HJ3 5HJ',
      Country: 'GB',
      Phone: '49-785-7322',
      Fax: 5434180,
      EmailAddress: ''
    },
    {
      UniqueName: 37,
      Name: 'Weldon Narayan : LIVERPOOL',
      SupplierId: 29,
      ContactID: 35,
      Contact: 'Weldon Narayan',
      Lines: '4567 SW 23rd Avenue',
      City: 'Liverpool',
      State: '',
      PostalCode: 'GT5 8AB',
      Country: 'US',
      Phone: '42-293-1990',
      Fax: 5434180,
      EmailAddress: ''
    },
    {
      UniqueName: 70,
      Name: 'Will Darrow : SUNNYVALE',
      SupplierId: 70,
      ContactID: 70,
      Contact: 'Will Darrow',
      Lines: '70th Avenue',
      City: 'Sunnyvale',
      State: 'CA',
      PostalCode: 94089,
      Country: 'US',
      Phone: '(650) 390-1000',
      Fax: '(650)390-1100',
      EmailAddress: ''
    },
    {
      UniqueName: 72,
      Name: 'Kathryn Kelly : SUNNYVALE',
      SupplierId: 72,
      ContactID: 72,
      Contact: 'Kathryn Kelly',
      Lines: '72nd Avenue',
      City: 'Sunnyvale',
      State: 'CA',
      PostalCode: 94089,
      Country: 'US',
      Phone: '(650) 390-1000',
      Fax: '+1 (650) 390-1100',
      EmailAddress: ''
    },
    {
      UniqueName: 73,
      Name: 'Amy Rogers : SUNNYVALE',
      SupplierId: 73,
      ContactID: 73,
      Contact: 'Amy Rogers',
      Lines: '73rd Avenue',
      City: 'Sunnyvale',
      State: 'CA',
      PostalCode: 94089,
      Country: 'US',
      Phone: '(650) 390-1000',
      Fax: '+1 (650) 390-1100',
      EmailAddress: ''
    },
    {
      UniqueName: 88,
      Name: 'Miranda Smith : SUNNYVALE',
      SupplierId: 80,
      ContactID: 88,
      Contact: 'Miranda Smith',
      Lines: '88th Avenue',
      City: 'Sunnyvale',
      State: 'CA',
      PostalCode: 94089,
      Country: 'US',
      Phone: '(650) 390-1088',
      Fax: '+1 (650) 390-1188',
      EmailAddress: ''
    },
    {
      UniqueName: 157,
      Name: 'Howard Fredric : MILWAUKEE',
      SupplierId: 157,
      ContactID: 157,
      Contact: 'Howard Fredric',
      Lines: 'P.O. Box 2053',
      City: 'Milwaukee',
      State: 'WI',
      PostalCode: 53201,
      Country: 'US',
      Phone: '(800) 600-6000',
      Fax: '+1 (800) 600-6001',
      EmailAddress: ''
    },
    {
      UniqueName: 1000214,
      Name: 'Jack Cohen : NEW YORK',
      SupplierId: 29,
      ContactID: 1000044,
      Contact: 'Jack Cohen',
      Lines: '55 Broadway',
      City: 'New York',
      State: 'NY',
      PostalCode: 10012,
      Country: 'US',
      Phone: '(516)234-5000',
      Fax: '(516)234-5500',
      EmailAddress: ''
    },
    {
      UniqueName: 1000195,
      Name: 'Lisa Kennedy : SANTA CLARA',
      SupplierId: 29,
      ContactID: 1000027,
      Contact: 'Lisa Kennedy',
      Lines: '8970 Tasman Drive',
      City: 'Santa Clara',
      State: 'CA',
      PostalCode: 95050,
      Country: 'US',
      Phone: '(408)246-4000',
      Fax: '(408)246-4100',
      EmailAddress: ''
    },
    {
      UniqueName: 1000195,
      Name: 'Chandler Perry : SANTA CLARA',
      SupplierId: 29,
      ContactID: 1000028,
      Contact: 'Chandler Perry',
      Lines: '8970 Tasman Drive',
      City: 'Santa Clara',
      State: 'CA',
      PostalCode: 95050,
      Country: 'US',
      Phone: '(408)246-4000',
      Fax: '(408)246-4100',
      EmailAddress: ''
    },
    {
      UniqueName: 1000454,
      Name: 'Joe Bryant : SANTA CLARA',
      SupplierId: 29,
      ContactID: 1000284,
      Contact: 'Joe Bryant',
      Lines: '675 Prune Lane',
      City: 'Santa Clara',
      State: 'CA',
      PostalCode: 95050,
      Country: 'US',
      Phone: '(408)246-7000',
      Fax: '',
      EmailAddress: ''
    },
    {
      UniqueName: 10021,
      Name: 'Katie Miller : PALO ALTO',
      SupplierId: 'sid502',
      ContactID: 10021,
      Contact: 'Katie Miller',
      Lines: '3000 ServerTech Blvd.',
      City: 'Palo Alto',
      State: 'CA',
      PostalCode: 94304,
      Country: 'US',
      Phone: '(650)578-1234',
      Fax: '(650)578-1234',
      EmailAddress: 'kmiller@servertech.test'
    },
    {
      UniqueName: 10022,
      Name: 'Ann Feaster : PALO ALTO',
      SupplierId: 'sid502',
      ContactID: 10022,
      Contact: 'Ann Feaster',
      Lines: '3000 ServerTech Blvd.',
      City: 'Palo Alto',
      State: 'CA',
      PostalCode: 94304,
      Country: 'US',
      Phone: '(650)578-1234',
      Fax: '(650)578-1234',
      EmailAddress: 'afeaster@servertech.test'
    },
    {
      UniqueName: 10041,
      Name: 'Teri Brown : BOONTON',
      SupplierId: 'sid504',
      ContactID: 10041,
      Contact: 'Teri Brown',
      Lines: '718 Digi Drive',
      City: 'Boonton',
      State: 'NJ',
      PostalCode: 7005,
      Country: 'US',
      Phone: '(973)415-1234',
      Fax: '',
      EmailAddress: 'tbrown@digi.test'
    },
    {
      UniqueName: 10051,
      Name: 'Vivian Johnson : IRVING',
      SupplierId: 'sid505',
      ContactID: 10051,
      Contact: 'Vivian Johnson',
      Lines: '6555 Network Ave.',
      City: 'Irving',
      State: 'TX',
      PostalCode: 75039,
      Country: 'US',
      Phone: '(877)541-1000',
      Fax: '',
      EmailAddress: 'vjohnson@network.test'
    },
    {
      UniqueName: 10081,
      Name: 'Cynthia Brown : SUNNYVALE',
      SupplierId: 'sid508',
      ContactID: 10081,
      Contact: 'Cynthia Brown',
      Lines: '495 LanSoft Lane',
      City: 'Sunnyvale',
      State: 'CA',
      PostalCode: 94089,
      Country: 'US',
      Phone: '(408)228-1234',
      Fax: '(408)228-4321',
      EmailAddress: 'cbrown@lansoft.test'
    },
    {
      UniqueName: 10091,
      Name: 'Nia McCray : MARLBOROUGH',
      SupplierId: 'sid509',
      ContactID: 10091,
      Contact: 'Nia McCray',
      Lines: '753 Apex Avenue',
      City: 'Marlborough',
      State: 'MA',
      PostalCode: 1752,
      Country: 'US',
      Phone: '(508)408-1234',
      Fax: '(508)408-4321',
      EmailAddress: 'nmccray@apextech.test'
    },
    {
      UniqueName: 10151,
      Name: 'Tiffany Edwards : DALLAS',
      SupplierId: 'sid515',
      ContactID: 10151,
      Contact: 'Tiffany Edwards',
      Lines: '13155 Eprint Blvd.',
      City: 'Dallas',
      State: 'TX',
      PostalCode: 75240,
      Country: 'US',
      Phone: '(800)161-1234',
      Fax: '(800)161-4321',
      EmailAddress: 'tedwards@eprint.test'
    },
    {
      UniqueName: 10261,
      Name: 'Kelly Munoz : DUBLIN',
      SupplierId: 'sid526',
      ContactID: 10261,
      Contact: 'Kelly Munoz',
      Lines: 'Beech Papyrus Place',
      City: 'Dublin',
      State: '',
      PostalCode: '',
      Country: 'IE',
      Phone: '(353)1-505-1234',
      Fax: '(353)1-505-4321',
      EmailAddress: 'kmunoz@papyrus.test'
    },
    {
      UniqueName: 1000911,
      Name: 'William Taylor : NEW YORK',
      SupplierId: 1000811,
      ContactID: 1000711,
      Contact: 'William Taylor',
      Lines: '1000811 Main St.',
      City: 'New York',
      State: 'NY',
      PostalCode: 10281,
      Country: 'US',
      Phone: '(212)555-1212',
      Fax: '',
      EmailAddress: ''
    },
    {
      UniqueName: 1000912,
      Name: 'Roger Freeman : NEW YORK',
      SupplierId: 1000812,
      ContactID: 1000712,
      Contact: 'Roger Freeman',
      Lines: '1000812 Main St.',
      City: 'New York',
      State: 'NY',
      PostalCode: 10281,
      Country: 'US',
      Phone: '(212)555-1212',
      Fax: '',
      EmailAddress: ''
    },
    {
      UniqueName: 1000913,
      Name: 'Stacy Matsumoto : NEW YORK',
      SupplierId: 1000813,
      ContactID: 1000713,
      Contact: 'Stacy Matsumoto',
      Lines: '1000813 Main St.',
      City: 'New York',
      State: 'NY',
      PostalCode: 10281,
      Country: 'US',
      Phone: '(212)555-1212',
      Fax: '',
      EmailAddress: ''
    },
    {
      UniqueName: 1000914,
      Name: 'Denise Stewart : NEW YORK',
      SupplierId: 1000814,
      ContactID: 1000714,
      Contact: 'Denise Stewart',
      Lines: '1000814 Main St.',
      City: 'New York',
      State: 'NY',
      PostalCode: 10281,
      Country: 'US',
      Phone: '(212)555-1212',
      Fax: '',
      EmailAddress: ''
    },
    {
      UniqueName: 1000915,
      Name: 'Calvin Fong : NEW YORK',
      SupplierId: 1000815,
      ContactID: 1000715,
      Contact: 'Calvin Fong',
      Lines: '1000815 Main St.',
      City: 'New York',
      State: 'NY',
      PostalCode: 10281,
      Country: 'US',
      Phone: '(212)555-1212',
      Fax: '',
      EmailAddress: ''
    },
    {
      UniqueName: 1000916,
      Name: 'Mary Smith : NEW YORK',
      SupplierId: 1000816,
      ContactID: 1000716,
      Contact: 'Mary Smith',
      Lines: '1000816 Main St.',
      City: 'New York',
      State: 'NY',
      PostalCode: 10281,
      Country: 'US',
      Phone: '(212)555-1212',
      Fax: '',
      EmailAddress: ''
    },
    {
      UniqueName: 1000917,
      Name: 'Tom Best : NEW YORK',
      SupplierId: 1000817,
      ContactID: 1000717,
      Contact: 'Tom Best',
      Lines: '1000817 Main St.',
      City: 'New York',
      State: 'NY',
      PostalCode: 10281,
      Country: 'US',
      Phone: '(212)555-1212',
      Fax: '',
      EmailAddress: ''
    },
    {
      UniqueName: 1000918,
      Name: 'Tim Zee : NEW YORK',
      SupplierId: 1000818,
      ContactID: 1000718,
      Contact: 'Tim Zee',
      Lines: '1000818 Main St.',
      City: 'New York',
      State: 'NY',
      PostalCode: 10281,
      Country: 'US',
      Phone: '(212)555-1212',
      Fax: '',
      EmailAddress: ''
    },
    {
      UniqueName: 1000919,
      Name: 'Michelle Low : NEW YORK',
      SupplierId: 1000819,
      ContactID: 1000719,
      Contact: 'Michelle Low',
      Lines: '1000819 Main St.',
      City: 'New York',
      State: 'NY',
      PostalCode: 10281,
      Country: 'US',
      Phone: '(212)555-1212',
      Fax: '',
      EmailAddress: ''
    },
    {
      UniqueName: 10011,
      Name: 'Erica Thorn : BOSTON',
      SupplierId: 'sid501',
      ContactID: 10011,
      Contact: 'Erica Thorn',
      Lines: '50 CMX Avenue',
      City: 'Boston',
      State: 'MA',
      PostalCode: 2122,
      Country: 'US',
      Phone: '(617)562-1234',
      Fax: '(617)562-1234',
      EmailAddress: 'ethorn@cmx.test'
    },
    {
      UniqueName: 10111,
      Name: 'Allison Walker : NEW YORK',
      SupplierId: 'sid511',
      ContactID: 10111,
      Contact: 'Allison Walker',
      Lines: '85 Globe Way',
      City: 'New York',
      State: 'NY',
      PostalCode: 10004,
      Country: 'US',
      Phone: '(212)209-1234',
      Fax: '(212)209-4321',
      EmailAddress: 'awalker@globe.test'
    },
    {
      UniqueName: 10121,
      Name: 'Jennifer Arcain : DALLAS',
      SupplierId: 'sid512',
      ContactID: 10121,
      Contact: 'Jennifer Arcain',
      Lines: '14235 Maximo Avenue',
      City: 'Dallas',
      State: 'TX',
      PostalCode: 75244,
      Country: 'US',
      Phone: '(972)616-1234',
      Fax: '(972)616-4321',
      EmailAddress: 'jarcain@maximo.test'
    },
    {
      UniqueName: 10131,
      Name: 'Cheryl Johnson : WASHINGTON',
      SupplierId: 'sid513',
      ContactID: 10131,
      Contact: 'Cheryl Johnson',
      Lines: '2830 Print Place',
      City: 'Washington',
      State: 'DC',
      PostalCode: 20008,
      Country: 'US',
      Phone: '(202)869-1234',
      Fax: '(202)869-4321',
      EmailAddress: 'cjohnson@print.test'
    },
    {
      UniqueName: 10141,
      Name: 'Jennifer Burse : MILFORD',
      SupplierId: 'sid514',
      ContactID: 10141,
      Contact: 'Jennifer Burse',
      Lines: '19 Trinity Drive',
      City: 'Milford',
      State: 'OH',
      PostalCode: 45150,
      Country: 'US',
      Phone: '(513)381-1234',
      Fax: '(513)381-4321',
      EmailAddress: 'jburse@trinity.test'
    },
    {
      UniqueName: 10171,
      Name: 'Cindy Robinson : NEW YORK',
      SupplierId: 'sid517',
      ContactID: 10171,
      Contact: 'Cindy Robinson',
      Lines: '28 Druid Drive',
      City: 'New York',
      State: 'NY',
      PostalCode: 10010,
      Country: 'US',
      Phone: '(212)565-1234',
      Fax: '(212)565-4321',
      EmailAddress: 'crobinson@druid.test'
    },
    {
      UniqueName: 10221,
      Name: 'Edna Brown : WILLSTON',
      SupplierId: 'sid522',
      ContactID: 10221,
      Contact: 'Edna Brown',
      Lines: '156 Indus Circle',
      City: 'Williston',
      State: 'VT',
      PostalCode: 5495,
      Country: 'US',
      Phone: '(802)468-1234',
      Fax: '(802)468-4321',
      EmailAddress: 'ebrown@indus.test'
    },
    {
      UniqueName: 10231,
      Name: 'Georgina Leonhard : BERLIN',
      SupplierId: 'sid491',
      ContactID: 10231,
      Contact: 'Georgina Leonhard',
      Lines: '10231 Indus Circle',
      City: 'Williston',
      State: 'VT',
      PostalCode: 5495,
      Country: 'US',
      Phone: '(802)468-1234',
      Fax: '(802)468-4321',
      EmailAddress: 'gleonhard@shintl.test'
    },
    {
      UniqueName: 10241,
      Name: 'Kurt Gallop : BARODA',
      SupplierId: 'sid491',
      ContactID: 10241,
      Contact: 'Kurt Gallop',
      Lines: '10241 Indus Circle',
      City: 'Baroda',
      State: 'MI',
      PostalCode: 49101,
      Country: 'US',
      Phone: '(802)468-1234',
      Fax: '(802)468-4321',
      EmailAddress: 'kgallop@shintel.test'
    },
    {
      UniqueName: 10251,
      Name: 'Howard Fredric : MILWAUKEE',
      SupplierId: 'sid600',
      ContactID: 10251,
      Contact: 'Howard Fredric',
      Lines: 'P.O. Box 2053',
      City: 'Milwaukee',
      State: 'WI',
      PostalCode: 53201,
      Country: 'US',
      Phone: '(802)468-1234',
      Fax: '(802)468-4321',
      EmailAddress: 'hfredric@manpower.test'
    }
  ];


export function supplierWithLocations(): Array<SupplierCSV> {
  const locs = indexLocations();
  return supplierDB.map((s) => {
    s.location = locs.get(s.UniqueName);
    return s;
  });
}

export function indexLocations(): Map<string, SupplierLocationCSV> {
  const m = new Map<string, SupplierLocationCSV>();
  supplierLocations.forEach((i) => {
    m.set(i.SupplierId, i);
  });

  return m;
}
