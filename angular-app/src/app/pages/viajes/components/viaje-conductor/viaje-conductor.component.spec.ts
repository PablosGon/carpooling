import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajeConductorComponent } from './viaje-conductor.component';

describe('ViajeConductorComponent', () => {
  let component: ViajeConductorComponent;
  let fixture: ComponentFixture<ViajeConductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViajeConductorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViajeConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
