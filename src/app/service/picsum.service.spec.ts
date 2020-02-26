import { TestBed } from '@angular/core/testing';

import { PicsumService } from './picsum.service';

describe('PicsumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PicsumService = TestBed.inject<PicsumService>(PicsumService);
    expect(service).toBeTruthy();
  });
});
