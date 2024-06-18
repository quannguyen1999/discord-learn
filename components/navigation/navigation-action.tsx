'use client'

import { Plus } from "lucide-react"
import { ActionTooltip } from "../ui/action-tooltip"
import { useModal } from "@/hooks/user-modal-store";

export const NavigationAction = () => {
    const {onOpen} = useModal();


    return (
        <div className="">
            <ActionTooltip
                side="right"
                align="center"
                label="Add a server"
            >

                <button onClick={() => onOpen("createServer")}>
                    <div className="flex h-[48px] w-[48px]
                        rounded-[24px] hover:rounded-[16px] 
                        items-center justify-center
                        bg-neutral-700
                        ">
                            <Plus 
                                className="hover:text-white text-emerald-500"
                                size={25}
                            />
                            
                    </div>
                </button>
                
            </ActionTooltip>
        </div>
    )
}