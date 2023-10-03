import {Component, OnInit} from '@angular/core';
import {IHistory} from "../../models/currency.model";
import {CurrencyService} from "../../services/currency.service";

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss']
})
export class CurrencyListComponent implements OnInit{

  arrayHistory: IHistory[] = [];
  showResultHistory = false;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.resultHistory
        .subscribe((item) => {
          this.arrayHistory.unshift(item)
        })
  }

}
