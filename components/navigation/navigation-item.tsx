'use client';


import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "../ui/action-tooltip";
import Image from "next/image";

interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string
}

export const NavigationItem = ({
    id,
    imageUrl,
    name
}: NavigationItemProps) => {
    const params = useParams();
    return (
        <ActionTooltip
            side="right"
            align="center"
            label={name}
        >
            <button
                onClick={() => {}}
                className="relative flex items-center"
            >
                <div className={cn(
                    "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
                    params?.serverId !== id && 'hover:h-[20px]',
                    params?.serverId === id ? "h-[36px]" : 'h-[8px]' 
                )}>
                    
                </div>
                <div className={cn(
                    "relative flex mx-3 h-[48px] w-[48px] rounded-[24px] hover:rounded-[16px] transition-all overflow-hidden",
                    params?.serverId === id && 'bg-primary/10 text-primary rounded-[16px['
                    
                )}>
                    <Image
                        fill
                        src={imageUrl}
                        alt="Channel"
                    />
                </div>
            </button>
        </ActionTooltip>
    )
}