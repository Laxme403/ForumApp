import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserThreadsModalComponentComponent } from './user-threads-modal.component';

describe('UserThreadsModalComponentComponent', () => {
  let component: UserThreadsModalComponentComponent;
  let fixture: ComponentFixture<UserThreadsModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserThreadsModalComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserThreadsModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
