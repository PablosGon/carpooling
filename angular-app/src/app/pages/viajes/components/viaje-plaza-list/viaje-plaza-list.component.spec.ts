import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajePlazaListComponent } from './viaje-plaza-list.component';

describe('ViajePlazaListComponent', () => {
  let component: ViajePlazaListComponent;
  let fixture: ComponentFixture<ViajePlazaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViajePlazaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViajePlazaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
