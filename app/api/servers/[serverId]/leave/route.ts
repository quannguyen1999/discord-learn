import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
    req: Request,
    {params}: {params: {serverId: string}}
) {
    try{
        const profile = await currentProfile();


        if(!profile){
            return new NextResponse("Unauthorized", {status:401})
        }

        if(!params.serverId){
            return new NextResponse("server id is missing" , {status : 400})
        }
        
        const server = await db.member.deleteMany({
            where: {
              profileId: profile.id,
              serverId: params.serverId
            },
        })

        return NextResponse.json(server);

    }catch(error){
        console.log("[SERVER_ID_LEAVE]", error);
        return new NextResponse("server error", {status: 500});
    }
}