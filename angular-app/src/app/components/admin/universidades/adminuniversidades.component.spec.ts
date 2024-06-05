import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminuniversidadesComponent } from './adminuniversidades.component';

describe('AdminuniversidadesComponent', () => {
  let component: AdminuniversidadesComponent;
  let fixture: ComponentFixture<AdminuniversidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminuniversidadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminuniversidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
