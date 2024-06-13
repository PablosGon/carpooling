import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajePlazaItemComponent } from './viaje-plaza-item.component';

describe('ViajePlazaItemComponent', () => {
  let component: ViajePlazaItemComponent;
  let fixture: ComponentFixture<ViajePlazaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViajePlazaItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViajePlazaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
