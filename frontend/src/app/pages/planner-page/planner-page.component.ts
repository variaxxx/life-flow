import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
	selector: 'app-planner-page',
	templateUrl: './planner-page.component.html',
	styleUrl: './planner-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlannerPageComponent {
}
