'use client'

import { Plus } from "lucide-react"
import { ActionTooltip } from "../ui/action-tooltip"

export const NavigationAction = () => {
   
    return (
        <div className="">
            <ActionTooltip
                side="right"
                align="center"
                label="Add a server"
            >

                <button>
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