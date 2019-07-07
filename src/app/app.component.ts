import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => AppComponent),
       multi: true
    }
  ]
})
export class AppComponent implements OnInit, ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  // tslint:disable-next-line: variable-name
  private _value;

  constructor() { }

  public get value() {
    console.log('get value called', this._value);
    return this._value;
  }

  public set value(v) {
    this._value = v;
    this.onChange(this._value);
    this.onTouched();
    console.log('set value called', this.value, v);
  }

  writeValue(obj: any): void {
    this._value = obj;
    console.log('writeValue called', this.value, obj);
  }

  // Optional
  onSomeEventOccured(newValue) {
    this._value = newValue;
  }

  ngOnInit() {
    console.log('Initiated.');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    console.log('setDisabledState called', this.value, isDisabled);
  }

  onChange: any = () => {
    console.log('onchange called', this.value)
  }

  onTouched: any = () => { 
    console.log('onTouched called', this.value)
  }

}
