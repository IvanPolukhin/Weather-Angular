import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetDisplayComponent } from './widget-display.component';

describe('WidgetDisplayComponent', () => {
  let component: WidgetDisplayComponent;
  let fixture: ComponentFixture<WidgetDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WidgetDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
