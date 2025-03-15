"use client";

import DatePicker, { registerLocale } from "react-datepicker";
import { enGB } from "date-fns/locale/en-GB";
import "react-datepicker/dist/react-datepicker.css";

export default function DateSelect({ formData, setFormData }) {
	registerLocale("gb", enGB);

	return (
		<div>
			<label
				htmlFor="pubDate"
				className="flex items-center gap-2 text-sm/6 font-medium text-violet-950 dark:text-violet-100"
			>
				Publish Date
				<div className="group relative">
					<span className="cursor-help text-sm font-bold text-violet-600 dark:text-violet-400">
						?
					</span>
					<div className="absolute left-1/2 z-10 mt-1 hidden w-40 -translate-x-1/2 rounded-md bg-gray-800 px-2 py-1 text-xs text-white shadow-md group-hover:block">
						Format: DD-MM-YYYY (Use the calendar to help)
					</div>
				</div>
			</label>
			<div className="mt-2">
				<DatePicker
					locale="gb"
					selected={formData.pubDate}
					onChange={date =>
						setFormData({ ...formData, pubDate: date })
					}
					dateFormat="dd-MM-yyyy"
					maxDate={new Date()}
					minDate={new Date("1970-01-01")}
					showYearDropdown
					yearDropdownItemNumber={55}
					scrollableYearDropdown
					showMonthDropdown
					className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-violet-950 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-violet-600 sm:text-sm/6 dark:bg-slate-500 dark:text-violet-100 dark:placeholder:text-violet-100/50 dark:focus:outline-violet-400"
				/>
				<input
					type="hidden"
					name="pubDate"
					value={formData.pubDate.toISOString()}
				/>
			</div>
		</div>
	);
}

export const dateFormats = [
	"MMMM YYYY",
	"YYYY-MM-DD",
	"MMM DD, YYYY",
	"DD.MM.YYYY",
	"MM-DD-YYYY",
	"DD-MM-YYYY",
	"MMM YYYY",
	"D MMMM YYYY",
	"YYYY"
];
