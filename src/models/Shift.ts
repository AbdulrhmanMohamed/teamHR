import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";
import { days, TypeShift } from "../types/enums";
/**
 * V2
 * const day = new Schema({
    start_hour: Number,
    end_hour: Number,
})
const weeks = new Schema({
    start_day: Number,
    end_day: Number,
    days: { day }
})
const months = new Schema({
    start_month: Number,
    end_month: Number,
    weeks: { weeks }
})
const years = new Schema({
    start_year: Number,
    end_year: Number,
    months: { months }
})
interface Iday {
    start_hour: Number,
    end_hour: Number,
}
interface Iweeks {
    start_week: Number,
    end_week: Number,
    days: Iday
}
interface Imonths {
    start_month: Number,
    end_month: Number,
    weeks: Iweeks
}
interface Iyears {
    start_year: Number,
    end_year: Number,
    months: Imonths
}
export interface IShift {
    day?: Iday,
    weeks?: Iweeks,
    months?: Imonths,
    years?: Iyears,
    name: String,
    typeShift: String
}
const schema = new Schema<IShift>({
    name: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    typeShift: {
        type: String,
        enum: TypeShift,
    },
    day: { day },
    weeks: { weeks },
    months: { months },
    years: { years }
}, { timestamps: true })
export const Company = mongoose.model('shift', schema);
 **/
export interface IShift {
    start_day: number,
    end_day: number,
    time: {
        start_hour: number,
        end_hour: number,
        originalTime: Number

    },
    weeklyHolidays: [number],
    name: String,
    branch: ObjectId,
    originalTime: Number
    origianalDays: [Number],
    allows: {
        weeklyHolidays: [Number],
        lateTime: {
            hours: Number,
            mins: Number,
        },
        leavingTime: {
            hours: Number,
            mins: Number,
        }

    }
}
const schema = new Schema<IShift>({
    start_day: Number,
    end_day: Number,
    time: {
        start_hour: Number,
        end_hour: Number,
        originalTime: Number

    },
    origianalDays: [Number],
    name: String,
    branch: {
        type: ObjectId,
        ref: "branch",
    },
    allows: {
        weeklyHolidays: [Number],
        lateTime: {
            hours: Number,
            mins: Number,
        },
        leavingTime: {
            hours: Number,
            mins: Number,
        }

    }
})
schema.pre('save', async function (next) {
    if (!this.isNew) return next();
    this.time.originalTime = (this.time.end_hour - this.time.start_hour)
    const weeklyHolidays: any = []
    const origianalDays: any = []
    for (let index = this.end_day; index >= this.start_day; index--) {
        origianalDays.push(index)
    }
    for (let index = 0; index < days.length; index++) {
        const day = days[index]
        if (!origianalDays.includes(day)) {
            weeklyHolidays.push(day)
        }
    }
    this.allows.weeklyHolidays = weeklyHolidays
    this.origianalDays = origianalDays
    next();
});

export const Shift = mongoose.model('shift', schema);