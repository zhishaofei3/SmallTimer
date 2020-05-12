# SmallTimer
SmallTimer

````javascript
import SmallTimer from "small-timer"

const timer = new SmallTimer(1000, 10)
timer.addEventListener(SmallTimer.TIMER, onTimer)
timer.addEventListener(SmallTimer.TIMER_COMPLETE, onComplete)
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
