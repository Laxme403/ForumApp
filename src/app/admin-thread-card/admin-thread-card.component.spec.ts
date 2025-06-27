import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminThreadCardComponent } from './admin-thread-card.component';

describe('AdminThreadCardComponent', () => {
  let component: AdminThreadCardComponent;
  let fixture: ComponentFixture<AdminThreadCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminThreadCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminThreadCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
