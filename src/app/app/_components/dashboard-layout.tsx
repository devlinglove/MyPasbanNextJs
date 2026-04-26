import Sidebar from "./sidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <aside>
                <Sidebar />
            </aside>
            <main className="main-container">
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout