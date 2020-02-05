import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfolistPage } from './infolist.page';

describe('InfolistPage', () => {
  let component: InfolistPage;
  let fixture: ComponentFixture<InfolistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfolistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfolistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
