import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajeItemComponent } from './viaje-item.component';

describe('ViajeItemComponent', () => {
  let component: ViajeItemComponent;
  let fixture: ComponentFixture<ViajeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViajeItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViajeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
