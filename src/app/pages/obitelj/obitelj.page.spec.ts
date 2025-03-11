import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObiteljPage } from './obitelj.page';

describe('ObiteljPage', () => {
  let component: ObiteljPage;
  let fixture: ComponentFixture<ObiteljPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ObiteljPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
