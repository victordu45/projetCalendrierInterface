import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CalendListPage } from './calend-list.page';

describe('CalendListPage', () => {
  let component: CalendListPage;
  let fixture: ComponentFixture<CalendListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalendListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
