import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NeweventPage } from './newevent.page';

describe('NeweventPage', () => {
  let component: NeweventPage;
  let fixture: ComponentFixture<NeweventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeweventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NeweventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
