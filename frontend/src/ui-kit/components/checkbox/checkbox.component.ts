import {ChangeDetectionStrategy, Component, forwardRef, inject, Input, ViewEncapsulation} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from "@angular/forms";

@Component({
    selector: 'ui-checkbox',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './checkbox.component.html',
    styleUrl: './checkbox.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: () => inject(ControlContainer, { skipSelf: true })
        }
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true
        }
    ]
})
export class CheckboxComponent {
  @Input({required: true}) formControlName!: string;
  @Input({required: true}) label!: string;

  private parentContainer = inject(ControlContainer);

  get formControl() {
    return this.parentContainer.control?.get(this.formControlName) as FormControl;
  }

  onChange = (value: boolean) => {};
  onTouched = () => {};

  writeValue(value: boolean): void {
    this.formControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleCheckbox(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.onChange(checked);
    this.onTouched();
  }
}
