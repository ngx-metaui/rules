import {Component} from '@angular/core';
import {AppConfig, ArrayDataProvider, DataProviders, Notifications} from '@ngx-meta/rules';
import {ApproverUser} from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private dataProviders: DataProviders,
              private notifications: Notifications,
              protected appConfig: AppConfig) {

    this.notifications.subscribe('app:error', (error: any) => {
      console.log('App Error: ', error);
    });
  }

  ngOnInit() {
    this.dataProviders.register(ApproverUser, new ArrayDataProvider(this.initUsers()));
  }


  initUsers(): ApproverUser[] {

    let users: Array<ApproverUser> = [];

    users.push(new ApproverUser('1', 'Yu', 'Han', 10));
    users.push(new ApproverUser('2', 'Dennis', 'Lee', 11));
    users.push(new ApproverUser('3', 'Ani', 'chauhan', 12));
    users.push(new ApproverUser('4', 'Fred', 'Flintstone', 13));
    users.push(new ApproverUser('5', 'Berney', 'Rubble', 14));
    users.push(new ApproverUser('6', 'Wilma', 'Flintstone', 15));
    users.push(new ApproverUser('7', 'Dino', 'Flintstone', 16));
    users.push(new ApproverUser('8', 'Bam Bam,', 'Rubble', 17));
    users.push(new ApproverUser('9', 'Frank', 'Kolar', 18));
    users.push(new ApproverUser('10', 'Lord', 'Nibbler', 19));
    users.push(new ApproverUser('11', 'Amy', 'Wong', 3));
    users.push(new ApproverUser('12', 'Doctor', 'Zoitberg', 20));
    users.push(new ApproverUser('13', 'Fhillip', 'Fry', 20));
    users.push(new ApproverUser('14', 'Brain', 'Slugs', 20));
    users.push(new ApproverUser('15', 'Antonio', 'Calculon', 20));
    users.push(new ApproverUser('16', 'Brain', 'Spawn', 20));
    users.push(new ApproverUser('17', 'Gypsy', 'bot', 20));
    users.push(new ApproverUser('18', 'Stephen', 'Hawking', 20));
    users.push(new ApproverUser('19', 'Pazuzu', 'Herman', 20));
    users.push(new ApproverUser('20', 'Flexo', 'DiMaggio', 30));
    users.push(new ApproverUser('21', 'Lisa', 'Simsons', 19));
    users.push(new ApproverUser('22', 'Kent', 'Brockman', 30));
    users.push(new ApproverUser('23', 'Carl', 'Carlson', 30));
    users.push(new ApproverUser('25', 'Scott', 'Christian', 30));
    users.push(new ApproverUser('26', 'Disco', 'Stu', 30));
    users.push(new ApproverUser('27', 'Ned', 'Flanders', 30));
    users.push(new ApproverUser('27', 'Stass', 'Allie', 30));
    users.push(new ApproverUser('28', 'Han', 'Solo', 30));
    users.push(new ApproverUser('29', 'Princess', 'Leia', 19));
    users.push(new ApproverUser('30', 'Chew', 'Bacca', 40));
    users.push(new ApproverUser('31', 'Kylo', 'Ren', 40));
    users.push(new ApproverUser('32', 'Jean-Luc', 'Picard', 40));
    users.push(new ApproverUser('33', 'Lois', 'Lane', 40));
    users.push(new ApproverUser('34', 'Clark', 'Kent', 40));
    users.push(new ApproverUser('35', 'Mickey', 'Mouse', 40));
    users.push(new ApproverUser('36', 'Woody', 'Woodpecker', 40));
    users.push(new ApproverUser('37', 'Porky', 'Pig', 8));
    users.push(new ApproverUser('38', 'Tom', 'Cat', 19));
    users.push(new ApproverUser('39', 'Jerry', 'Mouse', 19));
    users.push(new ApproverUser('40', 'Yosemite', 'Sam', 19));
    users.push(new ApproverUser('41', 'Tasmanian', 'Devil', 19));
    users.push(new ApproverUser('42', 'William', 'Azzario', 19));

    return users;
  }
}
