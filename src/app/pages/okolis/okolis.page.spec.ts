import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OkolisPage } from './okolis.page';

describe('OkolisPage', () => {
  let component: OkolisPage;
  let fixture: ComponentFixture<OkolisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OkolisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
