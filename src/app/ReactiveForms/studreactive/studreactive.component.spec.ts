import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudreactiveComponent } from './studreactive.component';

describe('StudreactiveComponent', () => {
  let component: StudreactiveComponent;
  let fixture: ComponentFixture<StudreactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudreactiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudreactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
