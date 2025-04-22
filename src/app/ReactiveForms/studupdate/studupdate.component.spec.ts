import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudupdateComponent } from './studupdate.component';

describe('StudupdateComponent', () => {
  let component: StudupdateComponent;
  let fixture: ComponentFixture<StudupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudupdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
