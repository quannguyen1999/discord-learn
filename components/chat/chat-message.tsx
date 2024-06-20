'use client'
import { Member, Message, Profile } from "@prisma/client";
import { ChatWelcome } from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment } from "react";
import {format} from 'date-fns';
import { ChatItem } from "./chat-item";
const DATE_FORMAT = "d MMM yyyy, HH:mm"

type MessageWithMemberWIthProfile = Message & {
    member: Member & {
        profile: Profile
    }
}

interface ChatMessagesProps {
    name: string;
    member: Member;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: 'channelId' | 'conversationId';
    paramValue: string;
    type: 'channel' | 'conversation'
}

export const ChatMessages = ({
    name,
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramValue,
    paramKey,
    type
}: ChatMessagesProps) => {
    const queryKey = `chat:${chatId}`;

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue
    })

    // if(status === 'pending'){
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4"/>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Loading messages...
                </p>

            </div>
        )
    // }

    // if(status === 'error'){
    //     return (
    //         <div className="felx flex-col flex-1 justify-center items-center">
    //             <ServerCrash className="h-7 w-7 text-zinc-500 animate-spin my-4"/>
    //             <p className="text-xs text-zinc-500 dark:text-zinc-400">
    //                 Something went wrong
    //             </p>

    //         </div>
    //     )
    // }
    // return (
    //     <div className="flex-1 flex flex-col py-4 overflow-y-auto">
    //         <div className="flex-1">
    //             <ChatWelcome
    //                 type={type}
    //                 name={name}
    //             />
    //             <div className="flex flex-col-reverse mt-auto">
    //                 {data?.pages?.map((group, i) => (
    //                     <Fragment key={i}>
    //                         {group.items.map((messages: MessageWithMemberWIthProfile) => (
    //                             <div key={messages.id}>

    //                                     <ChatItem 
    //                                         key={messages.id}
    //                                         id={messages.id}
    //                                         currentMember={member}
    //                                         member={messages.member}
    //                                         content={messages.content}
    //                                         fileUrl={messages.fileUrl}
    //                                         deleted={messages.deleted}
    //                                         timestamp={format(new Date(messages.createdAt), DATE_FORMAT)}
    //                                         isUpdated={messages.updatedAt !== messages.createdAt}
    //                                         socketUrl={socketUrl}
    //                                         socketQUery={socketQuery}
    //                                     />

    //                             </div>
    //                         ))}
    //                     </Fragment>
    //                 ))}
    //             </div>
    //         </div>
    //     </div>
    // )
}