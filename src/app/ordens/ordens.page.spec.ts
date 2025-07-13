import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdensPage } from './ordens.page';

describe('OrdensPage', () => {
  let component: OrdensPage;
  let fixture: ComponentFixture<OrdensPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdensPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
