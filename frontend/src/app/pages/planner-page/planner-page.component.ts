import {ChangeDetectionStrategy, Component} from '@angular/core';
import {IconComponent} from "../../../ui-kit/components/icon/icon.component";

@Component({
  selector: 'app-planner-page',
  standalone: true,
	imports: [
		IconComponent
	],
  templateUrl: './planner-page.component.html',
  styleUrl: './planner-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlannerPageComponent {

}
