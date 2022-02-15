import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryFixturesComponent } from './country-fixtures.component';

describe('CountryFixturesComponent', () => {
  let component: CountryFixturesComponent;
  let fixture: ComponentFixture<CountryFixturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryFixturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryFixturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
