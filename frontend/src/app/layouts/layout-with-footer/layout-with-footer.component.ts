import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-layout-with-footer',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './layout-with-footer.component.html',
  styleUrl: './layout-with-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutWithFooterComponent {

}
