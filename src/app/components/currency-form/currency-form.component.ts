import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";
import {map, Subscription} from "rxjs";
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

    variationExchange!: number;

    constructor(private fb: FormBuilder,
                public currencyService: CurrencyService) {}
    ngOnInit(): void {

        // Initialisation form
        this.initForm();

        // Ensure continuity of values
        this.formGroup.get('exchange')?.valueChanges.subscribe(() => {
            this.formGroup.get('amount')?.setValue(this.resultCalculate);
        })

        this.subscription = this.currencyService.exchangeRate$
            .pipe(
                map(item => {
                    return this.checkDisableExchange(item) ? {
                        realValue: item,
                        calculateValue: this.formGroup.get('exchangeForce')?.value
                    } : {
                        realValue: item,
                        calculateValue: item
                    }
                })
            )
            .subscribe(input => {
                console.log('input ', input)
                this.valueExchange = input.realValue;
                this.calculateExchange(input.realValue, input.calculateValue);
            })
    }

    /**
     * For initialisation form
     */
    private initForm(): void{
        this.formGroup = this.fb.group({
            amount: new FormControl('', Validators.required),
            exchange: new FormControl(''),
            exchangeForce: new FormControl('')
        })
    }

    /**
     * Calculate output of exchange rate based on the type of Switch
     */
    calculateExchange(realValue:number, exchangeValue: number): void{
        this.submitted = true;
        if(this.formGroup.valid) {
            const resultTmp = this.formGroup.get('exchange')?.value == 'usd' ?
                (exchangeValue != 0 ? +this.formGroup.get('amount')?.value / exchangeValue : 0) : // Skip division with zero
                +this.formGroup.get('amount')?.value * exchangeValue;
            this.resultCalculate = +resultTmp.toFixed(2);
            console.log('this.resultCalculate ', this.resultCalculate)

            this.currencyService.resultHistory.next({
                realRate: realValue.toFixed(2),
                enteredRate: this.formGroup.get('exchangeForce')?.value,
                initialValue: this.formGroup.get('amount')?.value + (this.formGroup.get('exchange')?.value=='usd' ? ' USD' : ' EUR'),
                calculateValue: this.resultCalculate + (this.formGroup.get('exchange')?.value=='usd' ? ' EUR' : ' USD'),
            })
        }
    }

    /**
     * Check variation for Disabled/Enabled exchange fixe
     * @param realRate
     * @private
     */
    private checkDisableExchange(realRate: number): boolean{
        if(!this.formGroup.get('exchangeForce')?.value){
            return false;
        }
        this.variationExchange = Math.abs(this.formGroup.get('exchangeForce')?.value) - Math.abs(realRate);
        return this.formGroup.get('exchangeForce')?.value && this.variationExchange <= 2;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
