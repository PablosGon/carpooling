import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNucleosComponent } from './admin-nucleos.component';

describe('AdminNucleosComponent', () => {
  let component: AdminNucleosComponent;
  let fixture: ComponentFixture<AdminNucleosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNucleosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminNucleosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
