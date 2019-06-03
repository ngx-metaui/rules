import { TestBed } from '@angular/core/testing';

import { AnchorScrollService } from './anchor-scroll.service';

describe('AnchorScrollService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnchorScrollService = TestBed.get(AnchorScrollService);
    expect(service).toBeTruthy();
  });
});
