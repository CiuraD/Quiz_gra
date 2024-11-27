import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndgamescreenComponent } from './endgamescreen.component';

describe('EndgamescreenComponent', () => {
  let component: EndgamescreenComponent;
  let fixture: ComponentFixture<EndgamescreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndgamescreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndgamescreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
