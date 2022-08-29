import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEspaceComponent } from './detail-espace.component';

describe('DetailEspaceComponent', () => {
  let component: DetailEspaceComponent;
  let fixture: ComponentFixture<DetailEspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailEspaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailEspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
