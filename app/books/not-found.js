import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div className="p-6 my-7 mx-auto w-full md:w-2xl lg:w-5xl rounded-md shadow-xs bg-white dark:bg-slate-900 text-violet-950 dark:text-violet-100">
            <div className="text-center">
                <h1 className="font-bold text-2xl/10">Perhaps the archives are incomplete...</h1>
                <div>
                    <span>We can't find that book! </span>
                    <Link href="/new-book" className="text-violet-700 dark:text-violet-100 hover:text-violet-500 dark:hover:text-violet-300">Add book manually</Link>
                </div>
            </div>
        </div>
    )
}