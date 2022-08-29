import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartSondageComponent } from './pie-chart-sondage.component';

describe('PieChartSondageComponent', () => {
  let component: PieChartSondageComponent;
  let fixture: ComponentFixture<PieChartSondageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieChartSondageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieChartSondageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
