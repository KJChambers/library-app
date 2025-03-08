import Header from "@/components/header";

export default function HomeLayout({ children }) {
    return (
        <main>
            <Header />
            {children}
        </main>
    )
}