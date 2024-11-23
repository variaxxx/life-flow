import {ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {IconComponent} from "../../../../ui-kit/components/icon/icon.component";
import {RouterLink} from "@angular/router";
import {SocialsIconComponent} from "../../../../ui-kit/components/socials-icon/socials-icon.component";
import {NavigationRoute, NavigationService} from "../../../services/navigation.service";

@Component({
  selector: 'app-footer',
  standalone: true,
	imports: [
		IconComponent,
		RouterLink,
		SocialsIconComponent
	],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {
	private navigationService = inject(NavigationService);

	public navigationRoutes!: NavigationRoute[];

	ngOnInit() {
		this.navigationRoutes = this.navigationService.getRoutes();
	}
}
