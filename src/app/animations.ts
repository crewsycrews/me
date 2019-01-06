import {  trigger, state, style, animate, transition, keyframes, query, animateChild, group} from '@angular/animations';

export const Blinking = 
    trigger('Blinking', [
        state('lightGreen', style({
        textShadow: "0px 0px 25px rgba(40, 210, 40, 0.9)"
        })),
        state('lightRed', style({
        textShadow: "0px 0px 25px rgba(210, 40, 40, 0.9)"
        })),
        state('lightYellow', style({
        textShadow: "0px 0px 25px rgba(210, 210, 40, 0.9)"
        })),
        state('lightBlue', style({
        textShadow: "0px 0px 25px rgba(40, 40, 210, 0.9)"
        })),
        state('lightWhite', style({
        textShadow: "0px 0px 25px rgba(200, 200, 200, 0.9)"
        })),
        transition('* => lightGreen', [
        animate('1.8s', keyframes([
            style({ textShadow: "0px 0px 25px rgba(40, 210, 40, 0.1)", offset: 0.05}),
            style({ textShadow: "0px 0px 25px rgba(40, 210, 40, 0.9)", offset: 0.25}),
            style({ textShadow: "0px 0px 2px rgba(40, 210, 40, 0.1)", offset: 0.3}),
            style({ textShadow: "0px 0px 25px rgba(40, 210, 40, 0.9)", offset: 0.35}),
            style({ textShadow: "0px 0px 2px rgba(40, 210, 40, 0.1)", offset: 0.5}),
            style({ textShadow: "0px 0px 25px rgba(40, 210, 40, 0.9)", offset: 0.55}),
            style({ textShadow: "0px 0px 2px rgba(40, 210, 40, 0.1)", offset: 0.75}),
            style({ textShadow: "0px 0px 25px rgba(40, 210, 40, 0.8)", offset: 0.95}),
            style({ textShadow: "0px 0px 25px rgba(40, 210, 40, 0.9)", offset: 1})
        ])),
        ]),
        transition('* => lightRed', [
        animate('1.8s', keyframes([
            style({ textShadow: "0px 0px 25px rgba(210, 40, 40, 0.1)", offset: 0.05}),
            style({ textShadow: "0px 0px 25px rgba(210, 40, 40, 0.9)", offset: 0.25}),
            style({ textShadow: "0px 0px 2px rgba(210, 40, 40, 0.1)", offset: 0.3}),
            style({ textShadow: "0px 0px 25px rgba(210, 40, 40, 0.9)", offset: 0.35}),
            style({ textShadow: "0px 0px 2px rgba(210, 40, 40, 0.1)", offset: 0.5}),
            style({ textShadow: "0px 0px 25px rgba(210, 40, 40, 0.9)", offset: 0.55}),
            style({ textShadow: "0px 0px 2px rgba(210, 40, 40, 0.1)", offset: 0.75}),
            style({ textShadow: "0px 0px 25px rgba(210, 40, 40, 0.8)", offset: 0.95}),
            style({ textShadow: "0px 0px 25px rgba(210, 40, 40, 0.9)", offset: 1})
        ])),
        ]),
        transition('* => lightYellow', [
        animate('1.8s', keyframes([
            style({ textShadow: "0px 0px 25px rgba(200, 200, 40, 0.1)", offset: 0.05}),
            style({ textShadow: "0px 0px 25px rgba(200, 200, 40, 0.9)", offset: 0.25}),
            style({ textShadow: "0px 0px 2px rgba(200, 200, 40, 0.1)", offset: 0.3}),
            style({ textShadow: "0px 0px 25px rgba(200, 200, 40, 0.9)", offset: 0.35}),
            style({ textShadow: "0px 0px 2px rgba(200, 200, 40, 0.1)", offset: 0.5}),
            style({ textShadow: "0px 0px 25px rgba(200, 200, 40, 0.9)", offset: 0.55}),
            style({ textShadow: "0px 0px 2px rgba(200, 200, 40, 0.1)", offset: 0.75}),
            style({ textShadow: "0px 0px 25px rgba(200, 200, 40, 0.8)", offset: 0.95}),
            style({ textShadow: "0px 0px 25px rgba(200, 200, 40, 0.9)", offset: 1})
        ])),
        ]),
        transition('* => lightBlue', [
        animate('1.8s', keyframes([
            style({ textShadow: "0px 0px 25px rgba(40, 40, 210, 0.1)", offset: 0.05}),
            style({ textShadow: "0px 0px 25px rgba(40, 40, 210, 0.9)", offset: 0.25}),
            style({ textShadow: "0px 0px 2px rgba(40, 40, 210, 0.1)", offset: 0.3}),
            style({ textShadow: "0px 0px 25px rgba(40, 40, 210, 0.9)", offset: 0.35}),
            style({ textShadow: "0px 0px 2px rgba(40, 40, 210, 0.1)", offset: 0.5}),
            style({ textShadow: "0px 0px 25px rgba(40, 40, 210, 0.9)", offset: 0.55}),
            style({ textShadow: "0px 0px 2px rgba(40, 40, 210, 0.1)", offset: 0.75}),
            style({ textShadow: "0px 0px 25px rgba(40, 40, 210, 0.8)", offset: 0.95}),
            style({ textShadow: "0px 0px 25px rgba(40, 40, 210, 0.9)", offset: 1})
        ])),
        ]),
        transition('* => lightWhite', [
        animate('1.8s', keyframes([
            style({ textShadow: "0px 0px 25px rgba(200, 200, 200, 0.1)", offset: 0.05}),
            style({ textShadow: "0px 0px 25px rgba(200, 200, 200, 0.9)", offset: 0.25}),
            style({ textShadow: "0px 0px 2px rgba(200, 200, 200, 0.1)", offset: 0.3}),
            style({ textShadow: "0px 0px 25px rgba(200, 200, 200, 0.9)", offset: 0.35}),
            style({ textShadow: "0px 0px 2px rgba(200, 200, 200, 0.1)", offset: 0.5}),
            style({ textShadow: "0px 0px 25px rgba(200, 200, 200, 0.9)", offset: 0.55}),
            style({ textShadow: "0px 0px 2px rgba(200, 200, 200, 0.1)", offset: 0.75}),
            style({ textShadow: "0px 0px 25px rgba(200, 200, 200, 0.8)", offset: 0.95}),
            style({ textShadow: "0px 0px 25px rgba(200, 200, 200, 0.9)", offset: 1})
        ])),
        ]),
    ]);
export const cubeTransitions = 
    trigger('routeAnimations', [
        
        transition('HomePage => summary', [
        query(':enter, :leave', [
            style({
            position: 'absolute'
            })
        ]),
        query(':leave', animateChild()),
        group([
            query(':leave', [
            style({ 
                transform: 'rotateY(0deg)',
                'transform-origin': 'left center'
            }),
            animate('1500ms ease-in-out', style({ 
                transform: 'rotateY(270deg) translateX(-420px)',
                }))
            ]),
            query(':enter', [
            style({ transform: 'rotateY(90deg) translateX(100px)'}),
            animate('1500ms ease-in-out', style({ transform: 'rotateY(0deg)'}))
            ])
        ]),
        query(':enter', animateChild()),
        ]),
        transition('summary => HomePage', [
            query(':enter, :leave', [
                style({
                position: 'absolute'
                })
            ]),
            query(':leave', animateChild()),
            group([
                query(':leave', [
                style({ 
                    transform: 'rotateY(0deg)',
                    'transform-origin': 'right center'
                }),
                animate('1000ms ease-in-out', style({ 
                    transform: 'rotateY(270deg) translateX(100px)',
                    }))
                ]),
                query(':enter', [
                style({ transform: 'rotateY(90deg) translateX(420px)'}),
                animate('1000ms ease-in-out', style({ transform: 'rotateY(0deg)'}))
                ])
            ]),
            query(':enter', animateChild()),
        ]),
        transition('* => job', [
            query(':enter, :leave', [
                style({
                position: 'absolute'
                })
            ]),
            query(':leave', animateChild()),
            group([
                query(':leave', [
                animate('700ms ease-in-out', style({ 
                    transform: 'translateX(-500px)',
                    opacity: '0',
                    }))
                ]),
                query(':enter', [
                style({ transform: 
                    'translateX(200px)',
                    opacity: '1.0',
                }),
                animate('700ms ease-in-out', style({ transform: 'translateX(0)'}))
                ])
            ]),
            query(':enter', animateChild()),
        ]),
        transition('job => *', [
            query(':enter, :leave', [
                style({
                position: 'absolute'
                })
            ]),
            query(':leave', animateChild()),
            group([
                query(':leave', [
                animate('700ms ease-in-out', style({ 
                    transform: 'translateX(500px)',
                    opacity: '0',
                    }))
                ]),
                query(':enter', [
                style({ transform: 
                    'translateX(-200px)',
                    opacity: '1.0',
                }),
                animate('700ms ease-in-out', style({ transform: 'translateX(0)'}))
                ])
            ]),
            query(':enter', animateChild()),
        ])
    ]);