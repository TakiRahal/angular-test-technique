import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";
import {Subscription} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss']
})
export class CurrencyFormComponent  implements OnInit, OnDestroy{

    valueExchange = 0;
    subscription: Subscription = new Subscription();

    formGroup!: FormGroup;

    submitted = false;

    resultCalculate!: number;

    constructor(private fb: FormBuilder,
                private currencyService: CurrencyService) {}
    ngOnInit(): void {

        // Initialisation form
        this.initForm();

        // Ensure continuity of values
        this.formGroup.get('exchange')?.valueChanges.subscribe(() => {
            this.formGroup.get('amount')?.setValue(this.resultCalculate);
        })

        this.subscription = this.currencyService.exchangeRate$
            .subscribe(input => {
              console.log('input ', input)
              this.valueExchange = input;
                this.calculateExchange(input);
            })
    }

    /**
     * For initialisation form
     */
    private initForm(): void{
        this.formGroup = this.fb.group({
            amount: new FormControl('', Validators.required),
            exchange: new FormControl(''),
        })
    }

    calculateExchange(exchangeValue: number): void{
        this.submitted = true;
        if(this.formGroup.valid) {
            const resultTmp = +this.formGroup.get('amount')?.value * exchangeValue;
            this.resultCalculate = +resultTmp.toFixed(2);
            console.log('this.resultCalculate ', this.resultCalculate)
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
