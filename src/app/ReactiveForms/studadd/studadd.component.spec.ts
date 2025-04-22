import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudaddComponent } from './studadd.component';

describe('StudaddComponent', () => {
  let component: StudaddComponent;
  let fixture: ComponentFixture<StudaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudaddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
