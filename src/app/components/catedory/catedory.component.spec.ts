import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatedoryComponent } from './catedory.component';

describe('CatedoryComponent', () => {
  let component: CatedoryComponent;
  let fixture: ComponentFixture<CatedoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatedoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatedoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
