import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleModalComponentComponent } from './role-modal.component';

describe('RoleModalComponentComponent', () => {
  let component: RoleModalComponentComponent;
  let fixture: ComponentFixture<RoleModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleModalComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
