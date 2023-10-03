import { Injectable } from '@angular/core';
import {BehaviorSubject, interval} from "rxjs";
import {IHistory} from "../models/currency.model";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  initialExchangeValue = 1.1;
  period = 3000; // Every 3 second
  public exchangeRate$ = new BehaviorSubject(this.initialExchangeValue);

  public resultHistory = new BehaviorSubject<IHistory>({} as IHistory);

  constructor() {
    const source = interval(this.period);
    source.subscribe(() => {
      this.exchangeRate$.next(+(this.initialExchangeValue + this.generateRandomValue()).toFixed(2));
    })
  }

  /**
   * For generate value between -0.05 and +0.05
   */
  public generateRandomValue(): number{
    return (Math.random() * 0.1) - 0.05;
  }
}
