import {inject, TestBed} from '@angular/core/testing';

import {AwNameStore} from './aw-name.store';

describe('AwNameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AwNameStore]
    });
  });

  it('should be created', inject([AwNameStore], (service: AwNameStore) => {
    expect(service).toBeTruthy();
  }));
});
