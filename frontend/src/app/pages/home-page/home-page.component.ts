import {ChangeDetectionStrategy, Component, inject, ViewChild} from '@angular/core';
import {ButtonComponent} from "../../../ui-kit/components/button/button.component";
import {RouterLink} from "@angular/router";
import {CarouselComponent, SliderItem} from "../../../ui-kit/components/carousel/carousel.component";
import {UserService} from "../../services/user.service";

export interface Opportunity {
	title: string;
	description: string;
	color: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
	imports: [
		ButtonComponent,
		RouterLink,
		CarouselComponent
	],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
	@ViewChild(CarouselComponent) carouselComponent!: CarouselComponent;

	private userService = inject(UserService);

	public opportunities: Opportunity[] = [
		{
			title: "Организация задач",
			description: "Забудьте о хаосе в делах. Создавайте списки задач, устанавливайте сроки выполнения и приоритеты, ставьте напоминания. В LifeFlows вы сможете видеть все задачи на день, неделю или месяц, чтобы заранее распределить своё время.",
			color: "var(--orange-300)"
		},
		{
			title: "Ведение личных записей",
			description: "Записывайте важные мысли, идеи и моменты жизни в безопасном личном пространстве. Личный дневник поможет лучше понимать себя и не забывать ценные воспоминания.",
			color: "var(--purple-300)"
		},
		{
			title: "Анализ и статистика",
			description: "С LifeFlows легко отслеживать прогресс по вашим задачам и анализировать, как меняется продуктивность с течением времени. Вы можете видеть, сколько задач выполнено, над чем еще стоит поработать и как распределено ваше время.",
			color: "var(--yellow-300)"
		},
		{
			title: "Интеграции и напоминания",
			description: "Подключайтесь к любимым календарям и инструментам — Google Calendar, Outlook и другими, чтобы всегда быть в курсе событий. Уведомления и напоминания помогут не забыть о важных задачах и мероприятиях.",
			color: "var(--red-300)"
		}
	];

	public sliderItems: SliderItem[] = [
		{
			imgSrc: "/assets/images/blue_abstract.jpg",
			imgAlt: "image1"
		},
		{
			imgSrc: "/assets/images/blue_abstract.jpg",
			imgAlt: "image2"
		},
		{
			imgSrc: "/assets/images/blue_abstract.jpg",
			imgAlt: "image3"
		},
		{
			imgSrc: "/assets/images/blue_abstract.jpg",
			imgAlt: "image4"
		},
		{
			imgSrc: "/assets/images/blue_abstract.jpg",
			imgAlt: "image5"
		}
	]

	public sliderNext() {
		this.carouselComponent.nextSlide();
	}

	public sliderPrev() {
		this.carouselComponent.prevSlide();
	}

	public isLogged() {
		return this.userService.isUserLoggedIn;
	}
}
