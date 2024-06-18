'use client';

import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import {X} from 'lucide-react';
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
// import axios from 'axios';

import { ourFileRouter } from "@/app/api/uploadthing/core";
import Image from 'next/image';
import { extractRouterConfig } from "uploadthing/server";

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: 'messageFile' | 'serverImage'
}

export const FileUpload = ({
    onChange,
    value,
    endpoint
}: FileUploadProps) => {
    const fileType = value?.split(".").pop();
    if(value && fileType !== 'pdf'){
        return (
            <div className="relative h-20 w-20">
                <Image 
                    fill
                    src={value}
                    alt="Upload"
                    className="rounded-full"
                />
                <button className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm">
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }

    return (
        <UploadButton
        content={{
            button({ ready }) {
              if (ready) return <div>Upload stuff</div>;
         
              return "Getting ready...";
            },
            allowedContent({ ready, fileTypes, isUploading }) {
              if (!ready) return "Checking what you allow";
              if (isUploading) return "Seems like stuff is uploading";
              return `Stuff you can upload: ${fileTypes.join(", ")}`;
            },
          }}
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url)
            }}
            onUploadError={(error: Error) => {
                console.log(error)
            }}
        />
       
    )
}