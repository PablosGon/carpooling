import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminviajesComponent } from './adminviajes.component';

describe('AdminviajesComponent', () => {
  let component: AdminviajesComponent;
  let fixture: ComponentFixture<AdminviajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminviajesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminviajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
