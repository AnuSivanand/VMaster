import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingDarkChartComponent } from './trading-dark-chart.component';

describe('TradingDarkChartComponent', () => {
  let component: TradingDarkChartComponent;
  let fixture: ComponentFixture<TradingDarkChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradingDarkChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingDarkChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
