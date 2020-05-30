import EventDispatcher from '@zhishaofei3/eventdispatcher'
/**
 * 事件分发类，基于three.js Core/EventDispatcher.js
 */
export default class SmallTimer extends EventDispatcher {
  _currentCount = 0 // [只读] 计时器从 0 开始后触发的总次数。
  delay = 0 // 计时器事件间的延迟（以毫秒为单位）
  repeatCount = 0 // 设置的计时器运行总次数。
  _running = false // [只读] 计时器的当前状态；如果计时器正在运行，则为 true，否则为 false
  firstTimestamp = 0 // 初始时间戳
  lastBeforeTimestamp = 0 // 最后一次执行的时间戳
  _pauseNextTimeDiff = 0 // 距离下一次执行的剩余时间
  data = null

  _timeoutId = 0

  static TIMER = 'TIMER'
  static TIMER_COMPLETE = 'TIMER_COMPLETE'

// 使用指定的 delay 和 repeatCount 状态构造新的 SmallTimer 对象，建议 delay 不要低于 20 毫秒。
  constructor(delay, count = Number.POSITIVE_INFINITY, data) {
    super()
    this.delay = Math.floor(delay)
    this.repeatCount = Math.floor(count) || Number.POSITIVE_INFINITY
    this.data = data
  }

// 如果计时器尚未运行，则启动计时器。
  start() {
    if (this._running) {
      return
    }
    this._running = true

    if (this._currentCount < this.repeatCount) {
      if (!this.firstTimestamp) {
        this.firstTimestamp = +new Date()
      }
      this._once(this._pauseNextTimeDiff)
    }
  }

  _once(delay = 0) {
    this._timeoutId = setTimeout(() => {
      this._currentCount++
      if (this._currentCount < this.repeatCount) {
        this.lastBeforeTimestamp = +new Date()
        this._once()
        this.dispatchEvent({
          type: SmallTimer.TIMER,
          target: this,
          currentTarget: this,
          currentCount: this.currentCount,
          repeatCount: this.repeatCount,
          data: this.data
        })
      } else {
        this.dispatchEvent({
          type: SmallTimer.TIMER_COMPLETE,
          target: this,
          currentTarget: this,
          currentCount: this.currentCount,
          repeatCount: this.repeatCount,
          data: this.data
        })
      }
    }, delay || this.delay)
  }

// 如果计时器正在运行，则停止计时器，并将 currentCount 属性设回为 0，这类似于秒表的重置按钮。
  reset() {
    clearTimeout(this._timeoutId)
    this._currentCount = 0
    this._running = false
    this.firstTimestamp = 0
    this.lastBeforeTimestamp = 0
    this._pauseNextTimeDiff = 0
  }

  pause() {
    const lastBefore = this.lastBeforeTimestamp || this.firstTimestamp
    this._pauseNextTimeDiff = this.delay - (+new Date() - lastBefore)

    clearTimeout(this._timeoutId)
    this._running = false
  }

  get currentCount() {
    return this._currentCount
  }

  get running() {
    return this._running
  }
}
