import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedGameComponent } from './selected-game.component';

describe('SelectedGameComponent', () => {
  let component: SelectedGameComponent;
  let fixture: ComponentFixture<SelectedGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedGameComponent]
    });
    fixture = TestBed.createComponent(SelectedGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
