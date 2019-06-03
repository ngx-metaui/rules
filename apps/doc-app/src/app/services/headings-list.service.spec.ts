import { TestBed } from '@angular/core/testing';

import { HeadingsListService } from './headings-list.service';

describe('HeadingsListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeadingsListService = TestBed.get(HeadingsListService);
    expect(service).toBeTruthy();
  });
});
