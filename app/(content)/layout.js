import Header from "@/components/header/header";

export default function HomeLayout({ children }) {
    return (
        <main>
            <Header />
            {children}
        </main>
    )
}