'use client'

import { CreateServerModal } from "@/hooks/create-server-modal"
import { InviteModal } from "../modals/invite.modal"


export const ModalProvider = () => {
    // const [isMounted, setIsMounted] = useState(false);

    // useEffect(() => {
    //     setIsMounted(true);
    // }, []);

    // if(!isMounted){
    //     return null;
    // }

    return (
        <>
            <CreateServerModal />
            <InviteModal />
        </>
    )
}