import {booleanAttribute, ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';
import {IconService} from "./services/icon.service";
import {SafeHtml} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'ui-icon',
    imports: [CommonModule],
    templateUrl: './icon.component.html',
    styleUrl: './icon.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
  @Input({required: true})
  set icon(value: string) {
    this._icon = value;
    this._svg = this.iconService.get(this._icon);
  }

  @HostBinding('innerHTML')
  private _svg?: SafeHtml;

  @HostBinding('class.filled')
  @Input({transform: booleanAttribute}) filled: boolean = false;

  private _icon: string = '';

  constructor(private iconService: IconService) {}
}
