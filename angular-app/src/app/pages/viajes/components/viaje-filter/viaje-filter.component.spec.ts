import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajeFilterComponent } from './viaje-filter.component';

describe('ViajeFilterComponent', () => {
  let component: ViajeFilterComponent;
  let fixture: ComponentFixture<ViajeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViajeFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViajeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
