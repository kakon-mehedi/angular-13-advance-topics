import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GqlFetchComponent } from './gql-fetch.component';

describe('GqlFetchComponent', () => {
  let component: GqlFetchComponent;
  let fixture: ComponentFixture<GqlFetchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GqlFetchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GqlFetchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
