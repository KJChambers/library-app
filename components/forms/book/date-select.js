'use client';

import DatePicker, { registerLocale } from "react-datepicker";
import { enGB } from 'date-fns/locale/en-GB';
import "react-datepicker/dist/react-datepicker.css";

export default function DateSelect({ date, setDate }) {
    registerLocale('gb', enGB);

    return (
        <div>
            <label htmlFor="pubDate" className="text-sm/6 font-medium text-violet-950 dark:text-violet-100 flex items-center gap-2">
                Publish Date
                <div className="relative group">
                    <span className="cursor-help text-violet-600 dark:text-violet-400 text-sm font-bold">?</span>
                    <div className="absolute z-10 left-1/2 -translate-x-1/2 mt-1 hidden w-40 rounded-md bg-gray-800 text-white text-xs px-2 py-1 shadow-md group-hover:block">
                        Format: DD-MM-YYYY (Use the calendar to help)
                    </div>
                </div>
            </label>
            <div className="mt-2">
                <DatePicker
                    locale="gb"
                    selected={date}
                    onChange={(date) => setDate(date)}
                    dateFormat="dd-MM-yyyy"
                    maxDate={new Date()}
                    minDate={new Date("1970-01-01")}
                    showYearDropdown
                    yearDropdownItemNumber={55}
                    scrollableYearDropdown
                    showMonthDropdown
                    className="block w-full rounded-md bg-white dark:bg-slate-500 px-3 py-1.5 text-base text-violet-950 dark:text-violet-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 dark:placeholder:text-violet-100/50 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 dark:focus:outline-violet-400 sm:text-sm/6"
                />
                <input type="hidden" name="pubDate" value={date.toISOString()} />
            </div>
        </div>
    );
}

export const dateFormats = [
    "MMMM YYYY",
    "YYYY-MM-DD",
    "MM-DD-YYYY",
    "DD-MM-YYYY",
    "MMM YYYY",
    "D MMMM YYYY",
    "YYYY"
]