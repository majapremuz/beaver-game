import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GradnjaPage } from './gradnja.page';

describe('GradnjaPage', () => {
  let component: GradnjaPage;
  let fixture: ComponentFixture<GradnjaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GradnjaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
