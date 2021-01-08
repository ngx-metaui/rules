export interface PaymentTermsCSV {
  UniqueName: string;
  Name: string;
  Description: string;
}


export const paymentTermsDB: Array<PaymentTermsCSV> =
  [
    {
      UniqueName: '00',
      Name: 'Due Immediately',
      Description: 'Due Immediately'
    },
    {
      UniqueName: '10N',
      Name: '10N',
      Description: 'Due on 10th day of next Month'
    },
    {
      UniqueName: '2D',
      Name: '2/10 Net30',
      Description: 'Net amount due in 30 days, 2% discount if paid in 10 days'
    },
    {
      UniqueName: '30',
      Name: 'Net 30',
      Description: 'Net Amount due in 30 days'
    },
    {
      UniqueName: '7N',
      Name: '7N',
      Description: 'Due on 7th day of next Month'
    },
    {
      UniqueName: 'EM',
      Name: 'EOM',
      Description: 'Due at the end of this month'
    },
    {
      UniqueName: 'NXTM',
      Name: 'Next Month',
      Description: 'Due in Next Month'
    },
    {
      UniqueName: 'PT1',
      Name: 'Net 45, 2%/30, 3%/20',
      Description: 'Net amount due in 45 days, 2% discount if paid in 30 days, 3% discount if ' +
        'paid in 20 days'
    },
    {
      UniqueName: 'PT2',
      Name: 'Net 30, 2%/20',
      Description: 'Net amount due in 30 days, 2% discount if paid in 20 days'
    },
    {
      UniqueName: 'PT3',
      Name: 'Net 30, 200/20',
      Description: 'Net amount due in 30 days, $200 discount if paid in 20 days'
    },
    {
      UniqueName: 'REB2%',
      Name: 'REB2%',
      Description: 'Maximum Rebate Percent 2%'
    },
    {
      UniqueName: 'REB5%',
      Name: 'REB5%',
      Description: 'Maximum Rebate Percent 5%'
    },
    {
      UniqueName: 'SP',
      Name: 'Split',
      Description: '1-15 due EOM, 16-31 due EOM+1'
    }
  ];


