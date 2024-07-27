import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalAnimationComponent } from './goal-animation.component';

describe('GoalAnimationComponent', () => {
  let component: GoalAnimationComponent;
  let fixture: ComponentFixture<GoalAnimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoalAnimationComponent]
    });
    fixture = TestBed.createComponent(GoalAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
