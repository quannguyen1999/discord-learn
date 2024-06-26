import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { useModal } from '../../hooks/user-modal-store';
import { Button } from "../ui/button";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import queryString from "query-string";

export const DeleteChannelModal = () => {
    const {isOpen, onClose, type, data} = useModal();
    const router = useRouter();
    
    const isModalOpen = isOpen && type === 'deleteChannel';
    const {server, channel} = data;
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try{
            setIsLoading(true);

            const url = queryString.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query: {
                    serverId: server?.id
                }
            })

            await axios.delete(`/api/servers/${server?.id}`);

            onClose();

            router.refresh();
            router.push(`/servers/${server?.id}`);
        } catch(error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete Channel
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to delete <br />
                        <span className="text-indigo-500 font-semibold">{channel?.name}</span> will be permantelly deleted
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button 
                            disabled={isLoading}
                            onClick={onClose}
                            variant="ghost"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            variant="primary"
                            onClick={onClick}
                        >
                            Confirm
                        </Button>
                        
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};

