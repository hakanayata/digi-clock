window.addEventListener('DOMContentLoaded', () => {

    //#region DOM elements
    const hourEl = document.getElementById("hours")
    const minEl = document.getElementById("minutes")
    const secEl = document.getElementById("seconds")

    const swHourEl = document.getElementById("sw-hours")
    const swMinEl = document.getElementById("sw-minutes")
    const swSecEl = document.getElementById("sw-seconds")

    const startStopBtn = document.getElementById("start-stop")
    const resetBtn = document.getElementById("reset")

    //#endregion

    function activateDisableResButton() {
        if (!isStopwatchOn) {
            resetBtn.removeAttribute("disabled")
        } else {
            resetBtn.setAttribute("disabled", "true")
        }
    }

    //#region Digital Clock
    setInterval(() => {
        // variables
        const now = new Date()
        const currentHours = String(now.getHours()).padStart(2, '0')
        const currentMinutes = String(now.getMinutes()).padStart(2, '0')
        const currentSeconds = String(now.getSeconds()).padStart(2, '0')

        // display current time on screen
        hourEl.textContent = currentHours
        minEl.textContent = currentMinutes
        secEl.textContent = currentSeconds

    }, 1000);
    //#endregion

    //#region STOPWATCH
    let isStopwatchOn = false
    let intervalID = null
    let hours = 0
    let minutes = 0
    let seconds = 0

    startStopBtn.addEventListener("click", () => {
        isStopwatchOn = !isStopwatchOn
        activateDisableResButton()

        if (isStopwatchOn) {
            clearInterval(intervalID)
            startStopBtn.textContent = "Stop"
            startStopBtn.classList.remove("btn-success")
            startStopBtn.classList.add("btn-danger")
            // call stopwatch function every 1 second
            intervalID = setInterval(stopwatch, 1000);
        } else {
            startStopBtn.textContent = "Start"
            startStopBtn.classList.remove("btn-danger")
            startStopBtn.classList.add("btn-success")
            clearInterval(intervalID)
        }
    })

    resetBtn.addEventListener("click", () => {
        if (!isStopwatchOn) {
            swHourEl.textContent = "00"
            swMinEl.textContent = "00"
            swSecEl.textContent = "00"
            hours = 0
            minutes = 0
            seconds = 0
            clearInterval(intervalID)
        }
    })

    function stopwatch() {
        seconds += 1

        if (seconds > 59) {
            minutes += 1
            seconds = 0
        }

        if (minutes > 59) {
            hours += 1
            minutes = 0
        }

        if (hours > 23) {
            hours = 0
            minutes = 0
            seconds = 0
        }
        // display stopwatch
        swSecEl.textContent = String(seconds).padStart(2, '0')
        swMinEl.textContent = String(minutes).padStart(2, '0')
        swHourEl.textContent = String(hours).padStart(2, '0')

    }
    //#endregion

})
