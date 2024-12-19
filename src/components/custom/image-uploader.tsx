"use client";

import {Upload, X} from "lucide-react";
import React, {useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";


interface ImageUploaderProps {
    onChange?: (file: File | null) => void,
    value?: string,
    className?: string,
}

export function ImageUploader({onChange, className}: ImageUploaderProps) {
    // const [preview, setPreview] = useState<string | null>(value || null); value
    const [preview, setPreview] = useState<File | null>(null);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                // const imageUrl = URL.createObjectURL(file);
                setPreview(file);
                onChange?.(file);
            }
        },
        [onChange]
    );

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            "application/*": [".pdf", ".docx", ".doc"],
        },
        maxFiles: 1,
    });

    const removeImage = useCallback(() => {
        setPreview(null);
        onChange?.(null);
    }, [onChange]);

    return (
        <div className={cn("w-full", className)}>
            {!preview ? (
                <div
                    {...getRootProps()}
                    className={cn(
                        "border-2 border-dashed rounded-lg transition-colors cursor-pointer h-44",
                        "hover:border-primary/50 hover:bg-muted/50",
                        isDragActive && "border-primary bg-muted",
                        "flex flex-col items-center justify-center gap-4"
                    )}
                >
                    <input {...getInputProps()} />
                    <div className="rounded-full bg-primary/10 p-4">
                        <Upload className="size-6 text-primary"/>
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium">
                            {isDragActive ? "Drop the image here" : "Ushlab tashlang"}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            yoki bosing va faylni tanlang
                        </p>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                        DOCX, PDF (max. 5MB)
                    </div>
                </div>
            ) : (
                <div
                    className={"flex h-44 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary/50 bg-muted/50 px-10 transition-colors"}>
                    <div
                        className="relative w-full overflow-hidden">
                        <div className="flex flex-col rounded-lg bg-muted p-4">
                            <p className="text-sm font-medium">Tanlangan Fayl:</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {preview.name} ({(preview.size / 1024 / 1024).toFixed(2)} MB)
                            </p>
                        </div>
                        {/* <Image */}
                        {/*    src={preview} */}
                        {/*    alt="Preview" */}
                        {/*    fill */}
                        {/*    className="object-cover" */}
                        {/*    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" */}
                        {/* /> */}
                        <Button
                            variant="destructive"
                            size="icon"
                            className="absolute right-2 top-2"
                            onClick={removeImage}
                        >
                            <X className="size-4"/>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}