import { TestBed } from '@angular/core/testing';

import { PicsumService } from './picsum.service';

describe('PicsumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PicsumService = TestBed.get(PicsumService);
    expect(service).toBeTruthy();
  });
});
