import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

// Component transition animations
export const slideInDownAnimation =
  trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0)'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }),
      animate('0.2s ease-in')
    ]),
    transition(':leave', [
      animate('0.5s ease-out', style({
        opacity: 0,
        transform: 'translateY(100%)'
      }))
    ])
  ]);

export function Collapse(duration: number = 300) {
  return trigger('collapse', [
    state('void', style({
      height: '0',
      opacity: '0',
      overflow: 'hidden'
    })),
    state('*', style({
      height: '*',
      opacity: '1',
      overflow: 'hidden'
    })),
    transition('void => *', [
      animate(duration + 'ms ease', keyframes([
        style({opacity: '1'}),
        style({height: '*'})
      ]))
    ]),
    transition('* => void', [
      animate(duration + 'ms ease', style({height: '0'}))
    ])
  ]);
}
