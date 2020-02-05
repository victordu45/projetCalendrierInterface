import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SettinglistPage } from './settinglist.page';

describe('SettinglistPage', () => {
  let component: SettinglistPage;
  let fixture: ComponentFixture<SettinglistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettinglistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SettinglistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
