import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SondageDetailComponent } from './sondage-detail.component';

describe('SondageDetailComponent', () => {
  let component: SondageDetailComponent;
  let fixture: ComponentFixture<SondageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SondageDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SondageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
