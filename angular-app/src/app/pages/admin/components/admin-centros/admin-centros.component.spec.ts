import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCentrosComponent } from './admin-centros.component';

describe('AdminCentrosComponent', () => {
  let component: AdminCentrosComponent;
  let fixture: ComponentFixture<AdminCentrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCentrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCentrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
