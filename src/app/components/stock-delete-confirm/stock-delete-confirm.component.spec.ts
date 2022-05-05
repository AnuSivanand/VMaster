import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDeleteConfirmComponent } from './stock-delete-confirm.component';

describe('StockDeleteConfirmComponent', () => {
  let component: StockDeleteConfirmComponent;
  let fixture: ComponentFixture<StockDeleteConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockDeleteConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
