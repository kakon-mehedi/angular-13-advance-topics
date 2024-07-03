import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestCkEditorComponent } from './latest-ck-editor.component';

describe('LatestCkEditorComponent', () => {
  let component: LatestCkEditorComponent;
  let fixture: ComponentFixture<LatestCkEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestCkEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestCkEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
