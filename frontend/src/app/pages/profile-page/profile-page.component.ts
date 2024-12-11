import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {ButtonComponent} from "../../../ui-kit/components/button/button.component";

@Component({
	selector: 'app-profile-page',
	imports: [
		ButtonComponent
	],
	templateUrl: './profile-page.component.html',
	styleUrl: './profile-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class ProfilePageComponent {

}
