import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifinfolistPage } from './modifinfolist.page';

describe('ModifinfolistPage', () => {
  let component: ModifinfolistPage;
  let fixture: ComponentFixture<ModifinfolistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifinfolistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifinfolistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
