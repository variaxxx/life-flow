import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject, OnInit,
} from '@angular/core';
import {RouterLink} from "@angular/router";
import {IconComponent} from "../../../../ui-kit/components/icon/icon.component";
import {ButtonComponent} from "../../../../ui-kit/components/button/button.component";
import {UserService} from "../../../services/user.service";
import {NavigationRoute, NavigationService} from "../../../services/navigation.service";

@Component({
    selector: 'app-header',
    imports: [
        RouterLink,
        IconComponent,
        ButtonComponent
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public stickyHeader: boolean = false;
  public menuOpened: boolean = false;
  public navigationRoutes!: NavigationRoute[];

  private userService = inject(UserService);
  private navigationService = inject(NavigationService);

  @HostListener('window:scroll') OnScroll() {
    this.stickyHeader = window.scrollY !== 0;
  }

  public toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }

  public isLogged() {
    return this.userService.isUserLoggedIn;
  }

  ngOnInit() {
    this.navigationRoutes = this.navigationService.getRoutes();
  }
}
