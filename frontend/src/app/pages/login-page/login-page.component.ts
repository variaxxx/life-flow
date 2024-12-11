import {ChangeDetectionStrategy, Component, inject, ViewEncapsulation} from '@angular/core';
import {ButtonComponent} from "../../../ui-kit/components/button/button.component";
import {InputComponent} from "../../../ui-kit/components/input/input.component";
import {LinkComponent} from "../../../ui-kit/components/link/link.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login-page',
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
		username: new FormControl<string>('', [Validators.required]),
		password: new FormControl<string>('', [Validators.required])
	})

	private userService = inject(UserService);
	private router = inject(Router);

	public onSubmit() {
		if (this.loginForm.valid) {
			this.userService.login(this.loginForm.value).subscribe(value => {
				this.router.navigateByUrl('');
				console.log('Successfully logged in');
			})
		}
	}
}
