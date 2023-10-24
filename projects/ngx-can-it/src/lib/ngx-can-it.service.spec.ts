import { TestBed } from '@angular/core/testing';

import { NgxCanItService } from './ngx-can-it.service';

describe('NgxCanItService', () => {
  let service: NgxCanItService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxCanItService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
