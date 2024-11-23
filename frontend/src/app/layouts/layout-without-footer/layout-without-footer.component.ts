import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-layout-without-footer',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './layout-without-footer.component.html',
  styleUrl: './layout-without-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutWithoutFooterComponent {

}
