import { NavigationSidebar } from "@/components/navigation/navigator-sidebar";

const MainLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-full">
             <div className="hidden md:flex h-full w-[72px] flex-col fixed">
                <NavigationSidebar />
            </div>
            <main className="md:pl-[72px] h-full">
                {children}
            </main>
        </div>
    );
}

export default MainLayout;