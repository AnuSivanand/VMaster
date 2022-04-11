import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySellTradeComponent } from './buy-sell-trade.component';

describe('BuySellTradeComponent', () => {
  let component: BuySellTradeComponent;
  let fixture: ComponentFixture<BuySellTradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuySellTradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuySellTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
