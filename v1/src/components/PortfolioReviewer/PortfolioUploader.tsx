"use client";

import React, { useState, useCallback } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import Tesseract from "tesseract.js";
import { Upload, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioUploaderProps {
    onTextExtracted: (text: string) => void;
}

export default function PortfolioUploader({ onTextExtracted }: PortfolioUploaderProps) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const processFile = async (file: File) => {
        setIsProcessing(true);
        setError(null);
        setProgress(0);
        setFileName(file.name);
        setSuccess(false);

        try {
            const result = await Tesseract.recognize(
                file,
                'eng',
                {
                    logger: (m) => {
                        if (m.status === 'recognizing text') {
                            setProgress(Math.round(m.progress * 100));
                        }
                    }
                }
            );

            const text = result.data.text;
            if (!text || text.trim().length === 0) {
                throw new Error("No text could be extracted from this image.");
            }

            onTextExtracted(text);
            setSuccess(true);
        } catch (err) {
            console.error("OCR Error:", err);
            setError("Failed to extract text. Please ensure the image is clear and contains readable text.");
        } finally {
            setIsProcessing(false);
        }
    };

    const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
        if (fileRejections.length > 0) {
            setError("Invalid file type. Please upload an image (PNG, JPG, JPEG).");
            return;
        }

        if (acceptedFiles.length > 0) {
            processFile(acceptedFiles[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.webp']
        },
        maxFiles: 1,
        multiple: false
    });

    return (
        <div className="w-full space-y-4">
            <div
                {...getRootProps()}
                className={cn(
                    "relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ease-out p-8 text-center",
                    isDragActive
                        ? "border-cyan-400 bg-cyan-400/10 scale-[1.01]"
                        : "border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800/30 bg-neutral-900/40",
                    error && "border-red-500/50 bg-red-500/5",
                    success && "border-emerald-500/50 bg-emerald-500/5"
                )}
            >
                <input {...getInputProps()} />

                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className={cn(
                        "p-4 rounded-full transition-colors duration-300",
                        isDragActive ? "bg-cyan-400/20 text-cyan-400" : "bg-neutral-800 text-neutral-400",
                        success && "bg-emerald-400/20 text-emerald-400",
                        error && "bg-red-400/20 text-red-400"
                    )}>
                        {success ? (
                            <CheckCircle2 className="w-8 h-8" />
                        ) : error ? (
                            <AlertCircle className="w-8 h-8" />
                        ) : isProcessing ? (
                            <Loader2 className="w-8 h-8 animate-spin" />
                        ) : (
                            <Upload className="w-8 h-8" />
                        )}
                    </div>

                    <div className="space-y-1">
                        <h3 className="font-semibold text-lg text-neutral-200">
                            {isProcessing ? "Processing Portfolio..." :
                                success ? "Extraction Complete!" :
                                    isDragActive ? "Drop it here!" : "Upload Portfolio Screenshot"}
                        </h3>
                        <p className="text-sm text-neutral-400 max-w-xs mx-auto">
                            {isProcessing ? `Analyzing text... ${progress}%` :
                                success ? `Successfully read ${fileName}` :
                                    error ? error :
                                        "Drag & drop or click to select a file. Support for PNG, JPG."}
                        </p>
                    </div>
                </div>

                {/* Progress Bar */}
                {isProcessing && (
                    <div className="absolute bottom-0 left-0 h-1 bg-cyan-500 transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
                )}
            </div>
        </div>
    );
}
