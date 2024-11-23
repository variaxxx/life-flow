import { Routes } from '@angular/router';
import {LayoutWithFooterComponent} from "./layouts/layout-with-footer/layout-with-footer.component";
import {LayoutWithoutFooterComponent} from "./layouts/layout-without-footer/layout-without-footer.component";
import {PlannerPageComponent} from "./pages/planner-page/planner-page.component";
import {FooterComponent} from "./components/patrials/footer/footer.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {RegisterPageComponent} from "./pages/register-page/register-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {ProfilePageComponent} from "./pages/profile-page/profile-page.component";
import {isLoggedGuard} from "./guards/is-logged.guard";
import { HeaderComponent } from './components/patrials/header/header.component';

export const routes: Routes = [
	{
		path: '',
		component: LayoutWithFooterComponent,
		title: 'LifeFlow - твой помощник в планировании | LifeFlow',
		children: [
			{
				path: '',
				outlet: 'header',
				component: HeaderComponent
			},
			{
				path: '',
				outlet: '',
				component: HomePageComponent
			},
			{
				path: '',
				outlet: 'footer',
				component: FooterComponent
			}
		]
	},
	{
		path: 'plan',
		component: LayoutWithFooterComponent,
		children: [
			{
				path: '',
				outlet: 'header',
				component: HeaderComponent
			},
			{
				path: '',
				outlet: '',
				component: PlannerPageComponent
			},
			{
				path: '',
				outlet: 'footer',
				component: FooterComponent
			}
		]
	},
	{
		path: 'account',
		component: LayoutWithoutFooterComponent,
		children: [
			{
				path: '',
				outlet: 'header',
				component: HeaderComponent
			},
			{
				path: 'register',
				outlet: '',
				title: 'Регистрация в системе | LifeFlow',
				component: RegisterPageComponent
			},
			{
				path: 'login',
				outlet: '',
				title: 'Авторизация в личный кабинет | LifeFlow',
				component: LoginPageComponent
			},
			{
				path: '',
				outlet: '',
				title: 'Личный кабинет | LifeFlow',
				component: ProfilePageComponent,
				canActivate: [isLoggedGuard]
			}
		]
	},
	{
		path: '**',
		redirectTo: ''
	}
];
