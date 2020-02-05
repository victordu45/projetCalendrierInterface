import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfosPage } from './infos.page';

describe('InfosPage', () => {
  let component: InfosPage;
  let fixture: ComponentFixture<InfosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
