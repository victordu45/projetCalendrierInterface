import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MembresPage } from './membres.page';

describe('MembresPage', () => {
  let component: MembresPage;
  let fixture: ComponentFixture<MembresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MembresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
