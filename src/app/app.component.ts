import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Subject } from 'rxjs';


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
  @Input() model;
  // tslint:disable-next-line: variable-name
  private _value;
  private _values = this.model;
   isEmailUpdate =new Subject<string>();
  constructor(private httpClient: HttpClient) {}

  public get values() {
    this.model = this._values;
    return this.model;
  }

  public set values(v) {
    this._values = v;
    this.onChange(this._values);
    this.onChange(this.model);
    this.onTouched();
    this.model = v;
    console.log('set value called', this.values, v);
  }

  writeValue(obj: any): void {
    this._values = obj;
    this.model = obj;
    console.log('writeValue called', this.values, obj);
  }

  // Optional
  onSomeEventOccured(newValue) {
    this._values = newValue;
    this.model = newValue;
  }

  ngOnInit() {
  this.isEmailUpdate.pipe(
debounceTime(800),
distinctUntilChanged())
.subscribe(value => {
this.checkForValidity(this.model.email)
});
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    console.log('setDisabledState called', this.values, isDisabled);
  }

  onChange: any = () => {
    console.log('onchange called', this.values)
  }

  onTouched: any = () => { 
    console.log('onTouched called', this.values)
  }

  checkForValidity(email) {
this.httpClient.get('//apilayer.net/api/check?access_key=bbb071970d3ed2aaf30c168e2181bd51&email=' + email).subscribe((data: any) => {
      let res = data;
      if(res && res.format_valid) {
        this.model.isValid = true;
      } else if(res && !res.format_valid){
        this.model.isValid = false;
      } else if(!res.success) {
        this.model.isValid = -1;
      }
    });
  }

}
