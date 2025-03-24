import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StanistePage } from './staniste.page';

describe('StanistePage', () => {
  let component: StanistePage;
  let fixture: ComponentFixture<StanistePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StanistePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
