import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PseudoNameComponent } from './pseudo-name.component';

describe('PseudoNameComponent', () => {
  let component: PseudoNameComponent;
  let fixture: ComponentFixture<PseudoNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PseudoNameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PseudoNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
