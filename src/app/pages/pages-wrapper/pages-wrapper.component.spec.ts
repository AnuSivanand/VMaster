import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesWrapperComponent } from './pages-wrapper.component';

describe('PagesWrapperComponent', () => {
  let component: PagesWrapperComponent;
  let fixture: ComponentFixture<PagesWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
