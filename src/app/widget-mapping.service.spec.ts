import { TestBed } from '@angular/core/testing';

import { WidgetMappingService } from './widget-mapping.service';

describe('WidgetMappingService', () => {
  let service: WidgetMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
