import { NavigationSidebar } from "@/components/navigation/navigator-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs/server";
import {db} from '@/lib/db';
import { redirect } from "next/navigation";
const MainLayout = async ({
    children,
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