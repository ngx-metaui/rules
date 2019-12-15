import {Component} from '@angular/core';

@Component({
  selector: 'fdp-landing2',
  templateUrl: './landing2.component.html',
  styleUrls: ['./landing2.component.scss']
})
export class Landing2Component {
  selectedRows = [];

  allSelected = false;

  tableRows = [
    {
      column1: 'INV2209',
      column2: '09/18/2019',
      column3: 'Angular Developer month #4',
      date: '09-07-18',
      type: 'search',
      checked: false
    },
    {
      column1: 'INV2202',
      column2: '09/18/2019',
      column3: 'Marketing DCOM Conference 2019',
      date: '09-07-18',
      type: 'cart',
      checked: false
    },
    {
      column1: 'INV2209',
      column2: '09/18/2019',
      column3: 'ngAtlanta Angular Conference sponsorship',
      date: '09-07-18',
      type: 'calendar',
      checked: false
    },
    {
      column1: 'INV3333',
      column2: '09/18/2019',
      column3: 'Hertz Car rental 02/10/2019 - 02/11/2019',
      date: '09-07-18',
      type: 'search',
      checked: false
    },
    {
      column1: 'INV2277',
      column2: '09/18/2019',
      column3: 'Roche farma Ariba migration to Hana',
      date: '09-07-18',
      type: 'search',
      checked: false
    }
  ];

  select(event: any, row: number): void {
    if (event.srcElement.checked) {
      this.selectedRows.push(row);
      this.tableRows[row].checked = true;
    } else {
      this.selectedRows.splice(this.selectedRows.indexOf(row), 1);
      this.tableRows[row].checked = false;
    }

    this.allSelected = this.checkIfAllSelected();
  }

  selectMaster() {
    if (this.allSelected) {
      this.deselectAll();
      this.allSelected = false;
    } else {
      this.selectAll();
      this.allSelected = true;
    }
  }

  private selectAll(): void {
    this.tableRows.forEach((row, index) => {
      if (row.checked === false) {
        row.checked = true;
        this.selectedRows.push(index);
      }
    });
    this.allSelected = true;
  }

  private deselectAll(): void {
    this.tableRows.forEach(row => {
      row.checked = false;
    });
    this.allSelected = false;
    this.selectedRows = [];
  }

  private checkIfAllSelected(): boolean {
    let state = true;
    this.tableRows.forEach(row => {
      if (row.checked === false) {
        state = false;
      }
    });
    return state;
  }

  constructor() {
  }


  ngOnInit() {

  }


}


