import {ChangeDetectionStrategy, Component, HostBinding, inject, InjectionToken, Input, Provider} from '@angular/core';
import {IconComponent} from "../icon/icon.component";

export interface SocialConfig {
  url: string;
  color: string;
  icon: {
    name: string;
    filled: boolean;
  }
}

export interface SocialsConfig {
  props: {
    [key: string]: SocialConfig;
  }
  defaultColor: string;
}

export const SOCIALS_PROPS = new InjectionToken<SocialsConfig>('SOCIALS_PROPS');

export const provideSocials = (config: SocialsConfig): Provider => ({
  provide: SOCIALS_PROPS,
  useValue: config
})

@Component({
  selector: 'ui-socials-icon',
  standalone: true,
  imports: [
    IconComponent
  ],
  templateUrl: './socials-icon.component.html',
  styleUrl: './socials-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialsIconComponent {
  @Input({required: true}) set social(value: string) {
    this._social = value;
    this._currentProps = this.getProps(value);
  };

  get social(): string {
    return this.currentProps.icon.name;
  }

  get currentProps(): SocialConfig {
    return this._currentProps;
  }

  getProps(name: string): SocialConfig {
    const props = this.socialsProps.props[name];
    if (!props) {
      throw new Error('This social media doesn\'t exist');
    }
    return props;
  }

  redirect() {
    const a = document.createElement('a');
    a.href = this.currentProps.url;
    a.target = '_blank';
    a.click();
  }

  @HostBinding('style.--socials-icon-default-color')
  get defaultColor(): string {
    return this.socialsProps.defaultColor;
  }

  @HostBinding('style.--socials-icon-hover-color')
  get hoverColor(): string {
    return this._currentProps.color;
  }

  private socialsProps = inject(SOCIALS_PROPS);

  private _social!: string;
  private _currentProps!: SocialConfig;
}
