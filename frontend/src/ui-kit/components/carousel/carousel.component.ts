import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";

export interface SliderItem {
  imgSrc: string;
  imgAlt: string;
}

@Component({
  selector: 'ui-carousel',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  @Input({required: true}) slides!: SliderItem[];
  @Input({required: true}) height!: string;

  public currentSlide: number = 0;

  public changeSlide(i: number) {
    this.currentSlide = i;
  }

  public nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  public prevSlide() {
    this.currentSlide = (this.slides.length + this.currentSlide - 1) % this.slides.length;
  }
}
