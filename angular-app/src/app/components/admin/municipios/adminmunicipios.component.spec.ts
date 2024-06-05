import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmunicipiosComponent } from './adminmunicipios.component';

describe('AdminmunicipiosComponent', () => {
  let component: AdminmunicipiosComponent;
  let fixture: ComponentFixture<AdminmunicipiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminmunicipiosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminmunicipiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
