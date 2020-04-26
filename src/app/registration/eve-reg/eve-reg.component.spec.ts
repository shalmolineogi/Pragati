import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EveRegComponent } from './eve-reg.component';

describe('EveRegComponent', () => {
  let component: EveRegComponent;
  let fixture: ComponentFixture<EveRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EveRegComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EveRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
