import {ChangeDetectionStrategy, Component, inject, ViewEncapsulation} from '@angular/core';
import {InputComponent} from "../../../ui-kit/components/input/input.component";
import {ButtonComponent} from "../../../ui-kit/components/button/button.component";
import {LinkComponent} from "../../../ui-kit/components/link/link.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CheckboxComponent} from "../../../ui-kit/components/checkbox/checkbox.component";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-register-page',
  standalone: true,
	imports: [
		InputComponent,
		ButtonComponent,
		LinkComponent,
		ReactiveFormsModule,
		CheckboxComponent
	],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPageComponent {
	private userService = inject(UserService);

	public registerForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		username: new FormControl('', [Validators.required, Validators.minLength(2)]),
		password: new FormControl('', [Validators.required, Validators.minLength(6)]),
		repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
		acceptTerms: new FormControl(false, [Validators.requiredTrue])
	})

	onSubmit() {
		this.userService.registration({
			username: this.registerForm.controls.email.value!,
			email: this.registerForm.controls.email.value!,
			password: this.registerForm.controls.password.value!,
			number: null,
			avatarUrl: null
		});
	}
}