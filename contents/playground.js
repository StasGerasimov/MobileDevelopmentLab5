
// Variant 1
console.log(`Variant ${8304 % 2 + 1}`);

class TimeSG {
    constructor(hour = 0, minute = 0, second = 0) {
        if (hour == String(new Date())) {
            this.hour = hour.getHours()
            this.minute = hour.getMinutes()
            this.second = hour.getSeconds()
        } else {
            this.hour = hour
            this.minute = minute
            this.second = second
            if (this.hour < 0 || this.hour > 23) {
                throw new Error(`Don't correct hour - ${this.hour}`)
            }
            if (this.minute < 0 || this.minute > 59) {
                throw new Error(`Don't correct minute - ${this.minute}`)
            }
            if (this.second < 0 || this.second > 59) {
                throw new Error(`Don't correct second - ${this.second}`)
            }
        }
    }
    
    toString() {
        console.log(`${this.hour < 10 ? '0' + this.hour : this.hour}:${this.minute < 10 ? '0' + this.minute : this.minute}:${this.second < 10 ? '0' + this.second : this.second} ${this.hour < 12 ? 'AM' : 'PM'}`);
    }

    add(time) {
        let second = 0, minute = 0, hour = 0
        second += this.second + time.second
        minute = this.minute + time.minute
        hour = this.hour + time.hour

        if (second >= 60) {
            second -= 60
            minute += 1
        }
        if (minute >= 60) {
            minute -= 60
            hour += 1
        }
        if (hour >= 24) {
            hour -= 24
        }

        return new TimeSG(hour, minute, second)
    }

    sub(time) {
        let second = this.second - time.second
        let minute = this.minute - time.minute
        let hour = this.hour - time.hour

        if (second < 0) {
            second += 60
            minute -= 1
        }
        if (minute < 0) {
            minute += 60
            hour -= 1
        }
        if (hour < 0) {
            hour += 24
        }
        return new TimeSG(hour, minute, second)
    }

    static addition(value1, value2) {
        let second = value1.second + value2.second
        let minute = value1.minute + value2.minute
        let hour = value1.hour + value2.hour

        if (second >= 60) {
            second -= 60
            minute += 1
        }
        if (minute >= 60) {
            minute -= 60
            hour += 1
        }
        if (hour >= 24) {
            hour -= 24
        }
        return new TimeSG(hour, minute, second)
    }

    static subtraction(value1, value2) {
        let second = value1.second - value2.second
        let minute = value1.minute - value2.minute
        let hour = value1.hour - value2.hour

        if (second < 0) {
            second += 60
            minute -= 1
        }
        if (minute < 0) {
            minute += 60
            hour -= 1
        }
        if (hour < 0) {
            hour += 24
        }
        return new TimeSG(hour, minute, second)
    }
}

console.log("Методи ініціалізації");

const time1 = new TimeSG()
time1.toString()
const time2 = new TimeSG(23, 59, 59)
time2.toString()
const time3 = new TimeSG(0, 0, 1)
time3.toString()
const time4 = new TimeSG(new Date())
time4.toString()
const time5 = new TimeSG(10, 0, 1)
time5.toString()


console.log("Методи, що повертають суму/різницю поточного об'єкта та об'єкта, що отриманий як вхідний параметр");

time2.add(time3).toString();
time2.sub(time3).toString();

console.log("Методи, що повертають суму/різницю двох об'єктів, що отримані як вхідні параметри");

TimeSG.addition(time5, time4).toString();
TimeSG.subtraction(time3, time5).toString();
