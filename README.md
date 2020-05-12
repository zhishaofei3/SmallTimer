# MyTimer
ES6 MyTimer

````javascript
import MyTimer from "./MyTimer"

const timer = new MyTimer(1000, 10)
timer.addEventListener(MyTimer.TIMER, onTimer)
timer.addEventListener(MyTimer.TIMER_COMPLETE, onComplete)
timer.start()
// timer.pause()
// timer.reset()

function onTimer(e) {
  console.log('timer current count:', e.currentCount)
  console.log('timer repeat count:', e.repeatCount)
  console.log('timer is running:', e.running)
}

function onComplete() {
  console.log('complete')
}

````
