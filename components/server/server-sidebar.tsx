import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import {db} from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { ServerHeader } from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { ServerSearch } from "./server-search";
import { channel as diagnosticsChannel } from "diagnostics_channel";

interface ServerSidebarProps {
    serverId: string;

}

const iconMap = {
    [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4"/>,
    [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4"/>,
    [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4"/>
}

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />,
    [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />,
}

export const ServerSidebar = async ({
    serverId
}: ServerSidebarProps) => {
    const profile = await currentProfile();

    if(!profile){
        return redirect("/");        
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: 'asc'
                }
            },
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: 'asc'
                }
            }
        }
    });



    const textChannels = server?.channels.
        filter((channel) => channel.type === ChannelType.TEXT);
    const audioChannels = server?.channels.
        filter((channel) => channel.type === ChannelType.AUDIO);
    const videoChannels = server?.channels.
        filter((channel) => channel.type === ChannelType.VIDEO);
    const members = server?.members.
        filter((member) => member.profileId !== profile.id);

    if(!server){
        return redirect("/");
    }

    const role = server.members.find((member) => member.profileId === profile.id)?.role;

    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#282D31] bg-[#F2F3F5]">
            <ServerHeader
                server={server}
                role={role}
            />
            <ScrollArea className="flex-1 px-3">
                <div className="mt-2">
                    <ServerSearch 
                        data={
                            [
                                {
                                    label: 'Text Channel',
                                    type: 'channel',
                                    data: textChannels?.map((ch) => ({
                                        id: ch.id,
                                        name: ch.name,
                                        icon: iconMap[ch.type]
                                    }))
                                },
                                {
                                    label: 'Audio Channel',
                                    type: 'channel',
                                    data: audioChannels?.map((ch) => ({
                                        id: ch.id,
                                        name: ch.name,
                                        icon: iconMap[ch.type]
                                    }))
                                },
                                {
                                    label: 'Video Channel',
                                    type: 'channel',
                                    data: videoChannels?.map((ch) => ({
                                        id: ch.id,
                                        name: ch.name,
                                        icon: iconMap[ch.type]
                                    }))
                                },
                                {
                                    label: 'Members',
                                    type: 'member',
                                    data: members?.map((ch) => ({
                                        id: ch.id,
                                        name: ch.profile.name,
                                        icon: roleIconMap[ch.role]
                                    }))
                                }
                            ]
                        }
                    />
                </div>
            </ScrollArea>
        </div>
    )
    
}