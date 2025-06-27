import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminThreadListComponent } from './admin-thread-list.component';

describe('AdminThreadListComponent', () => {
  let component: AdminThreadListComponent;
  let fixture: ComponentFixture<AdminThreadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminThreadListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminThreadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
