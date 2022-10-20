import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunRiseSetComponent } from './sun-rise-set.component';

describe('SunRiseSetComponent', () => {
  let component: SunRiseSetComponent;
  let fixture: ComponentFixture<SunRiseSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SunRiseSetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SunRiseSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
