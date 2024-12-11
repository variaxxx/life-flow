import {ChangeDetectionStrategy, Component, forwardRef, inject, Input, ViewEncapsulation} from '@angular/core';
import {
	ControlContainer,
	FormControl,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule
} from "@angular/forms";
import {NgIf} from "@angular/common";

export type InputSize = 'sm' | 'md' | 'lg';
export type InputType = 'text' | 'password';

@Component({
    selector: 'ui-input',
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [{ provide: ControlContainer, useFactory: () => inject(ControlContainer, { skipSelf: true }) }],
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true }]
})
export class InputComponent {
  @Input({required: true}) name!: string;
	@Input({required: true}) type!: InputType;
	@Input({required: true}) formControlName!: string;
	@Input({required: true, alias: 'inputId'}) id!: string;
	@Input() label?: string;
	@Input() autocomplete?: string;
	@Input() placeholder?: string = '';
	@Input() size: InputSize = 'md';

	private parentContainer = inject(ControlContainer);

	get formControl() {
		return this.parentContainer.control?.get(this.formControlName) as FormControl;
	}

	onChange = (value: any) => {};
	onTouched = () => {};

	writeValue(value: any): void {
		this.formControl.setValue(value);
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}
}
