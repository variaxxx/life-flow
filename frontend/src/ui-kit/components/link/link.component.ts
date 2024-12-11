import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';

export type LinkSize = 'sm' | 'md' | 'lg';

@Component({
    selector: 'ui-link',
    imports: [],
    templateUrl: './link.component.html',
    styleUrl: './link.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent {
  @Input({required: true}) href!: string;
  @Input() size: LinkSize = 'md';
}
