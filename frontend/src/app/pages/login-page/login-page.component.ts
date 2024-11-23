import {ChangeDetectionStrategy, Component, inject, ViewEncapsulation} from '@angular/core';
import {ButtonComponent} from "../../../ui-kit/components/button/button.component";
import {InputComponent} from "../../../ui-kit/components/input/input.component";
import {LinkComponent} from "../../../ui-kit/components/link/link.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login-page',
  standalone: true,
	imports: [
		ButtonComponent,
		InputComponent,
		LinkComponent,
		ReactiveFormsModule
	],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
	public loginForm = new FormGroup({
		email: new FormControl<string>('', [Validators.required, Validators.email]),
		password: new FormControl<string>('', [Validators.required])
	})

	private userService = inject(UserService);

	public onSubmit() {
		this.userService.login({
			username: this.loginForm.controls.email.value!,
			password: this.loginForm.controls.password.value!
		});
	}
}
