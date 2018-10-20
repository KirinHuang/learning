export class Hero {
  id: number;
  name: string;
}


import { interval, fromEvent, SubscribableOrPromise } from 'rxjs';

// Create an Observable that will publish a value on an interval
const secondsCounter = interval(1000);
// Subscribe to begin publishing values
secondsCounter.subscribe(n =>
  console.log(`It's been ${n} seconds since subscribing!`));
