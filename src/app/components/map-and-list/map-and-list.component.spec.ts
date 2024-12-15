import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAndListComponent } from './map-and-list.component';

describe('MapAndListComponent', () => {
  let component: MapAndListComponent;
  let fixture: ComponentFixture<MapAndListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapAndListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapAndListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
