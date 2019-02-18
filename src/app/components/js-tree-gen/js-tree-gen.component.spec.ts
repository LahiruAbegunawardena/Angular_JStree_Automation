import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsTreeGenComponent } from './js-tree-gen.component';

describe('JsTreeGenComponent', () => {
  let component: JsTreeGenComponent;
  let fixture: ComponentFixture<JsTreeGenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsTreeGenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsTreeGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
