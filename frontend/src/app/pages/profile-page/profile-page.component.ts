import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {RouterLink} from "@angular/router";
import {ButtonComponent} from "../../../ui-kit/components/button/button.component";

@Component({
  selector: 'app-profile-page',
  standalone: true,
	imports: [
		RouterLink,
		ButtonComponent
	],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ProfilePageComponent {

}
