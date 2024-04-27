import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudformComponent } from './solicitudform.component';

describe('SolicitudformComponent', () => {
  let component: SolicitudformComponent;
  let fixture: ComponentFixture<SolicitudformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
