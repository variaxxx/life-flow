import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';

export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'primary' | 'secondary';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input({alias: 'size'}) buttonSize: ButtonSize = 'md';
  @Input({alias: 'type'}) buttonType: ButtonType = 'secondary';
  @Input() disabled = false;
}
