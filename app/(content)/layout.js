import Header from "@/components/header";

export default function HomeLayout({ children }) {
    return (
        <main className="bg-slate-100 dark:bg-slate-800">
            <Header />
            {children}
        </main>
    )
}