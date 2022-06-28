import {animate, style, transition, trigger} from "@angular/animations";

export const carouselAnimation = () => {
  return trigger('carouselAnimation', [
    transition('void => *', [
      style({ opacity: 0 }),
      animate('300ms', style({ opacity: 1 }))
    ]),
    transition('* => void', [
      animate('300ms', style({ opacity: 0 }))
    ])
  ])
}
