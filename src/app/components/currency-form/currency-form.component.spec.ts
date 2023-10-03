import {ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { CurrencyFormComponent } from './currency-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";
import {CurrencyService} from "../../services/currency.service";

describe('CurrencyFormComponent', () => {
  let component: CurrencyFormComponent;
  let fixture: ComponentFixture<CurrencyFormComponent>;
  let currencyService: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CurrencyFormComponent]
    });

    currencyService = new CurrencyService();
    fixture = TestBed.createComponent(CurrencyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have an initialize value 1.1`, () => {
    const spanEl = fixture.debugElement.query(By.css('#label-currency-service span'));
    expect(spanEl.nativeElement.innerHTML).toEqual('1.1');
  });

  it(`should generate a random value and calculate value`, <any>fakeAsync((): void => {

    // Given
    spyOn(currencyService, 'generateRandomValue').and.returnValue(-0.04);

    // When
    component.ngOnInit();
    component.currencyService.exchangeRate$.subscribe((names) => {
      console.log('names names ', names)
    });

    // Then
    const spanEl = fixture.debugElement.query(By.css('#label-currency-service span'));
    expect(spanEl.nativeElement.innerHTML).toEqual('1.1');
    tick(3000);
    console.log('spanEl.nativeElement.innerHTML ', spanEl.nativeElement.innerHTML)

    discardPeriodicTasks()

  }));

});
