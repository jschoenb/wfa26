import {Component, computed, signal} from '@angular/core';

@Component({
  selector: 'bs-signal-test',
  imports: [],
  templateUrl: './signal-test.html',
  styles: ``,
})
export class SignalTest {
  counter  = signal(0);

  derivedCounter = computed(()=>{
    return this.counter() *10
  })


  increment() {
    //this.counter.set(this.counter() + 1);
    this.counter.update(counter => counter +1);
  }
}
