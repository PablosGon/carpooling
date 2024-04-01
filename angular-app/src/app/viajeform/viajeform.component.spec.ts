import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajeformComponent } from './viajeform.component';

describe('ViajeformComponent', () => {
  let component: ViajeformComponent;
  let fixture: ComponentFixture<ViajeformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViajeformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViajeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
