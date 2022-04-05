import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LooperPanelComponent } from './looper-panel.component';

describe('LooperPanelComponent', () => {
  let component: LooperPanelComponent;
  let fixture: ComponentFixture<LooperPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LooperPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LooperPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
