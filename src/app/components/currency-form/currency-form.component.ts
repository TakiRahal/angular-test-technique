import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss']
})
export class CurrencyFormComponent  implements OnInit, OnDestroy{

  valueExchange = 0;
  subscription: Subscription = new Subscription();

  constructor(private currencyService: CurrencyService) {}
  ngOnInit(): void {
    this.subscription = this.currencyService.exchangeRate$
        .subscribe(input => {
          console.log('input ', input)
          this.valueExchange = input;
        })
  }
  ngOnDestroy(): void {
  }
}
