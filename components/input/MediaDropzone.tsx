"use client";
import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

type MediaFile = {
    file: File;
    preview: string;
    type: "image" | "video";
};

interface Props {
    onChange: (files: File[]) => void;
}

const MAX_IMAGES = 10;
const MAX_VIDEOS = 3;

const MediaDropzone: React.FC<Props> = ({ onChange }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [files, setFiles] = useState<MediaFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [previewItem, setPreviewItem] = useState<MediaFile | null>(null);

    const imageCount = files.filter((f) => f.type === "image").length;
    const videoCount = files.filter((f) => f.type === "video").length;

    const handleFiles = (selectedFiles: FileList | null) => {
        if (!selectedFiles) return;

        const newFiles: MediaFile[] = [];

        Array.from(selectedFiles).forEach((file) => {
            const isImage = file.type.startsWith("image");
            const isVideo = file.type.startsWith("video");

            if (isImage && imageCount + newFiles.filter(f => f.type === "image").length >= MAX_IMAGES) return;
            if (isVideo && videoCount + newFiles.filter(f => f.type === "video").length >= MAX_VIDEOS) return;
            if (!isImage && !isVideo) return;

            newFiles.push({
                file,
                preview: URL.createObjectURL(file),
                type: isImage ? "image" : "video",
            });
        });

        const updated = [...files, ...newFiles];
        setFiles(updated);
        onChange(updated.map((f) => f.file));
    };

    const removeFile = (index: number) => {
        const updated = files.filter((_, i) => i !== index);
        setFiles(updated);
        onChange(updated.map((f) => f.file));
    };

    return (
        <>
            {/* Dropzone */}
            <Box
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    handleFiles(e.dataTransfer.files);
                }}
                onClick={() => inputRef.current?.click()}
                sx={{
                    border: "2px dashed",
                    borderColor: isDragging ? "primary.main" : "grey.400",
                    borderRadius: 3,
                    p: 5,
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "0.25s",
                    backgroundColor: isDragging ? "rgba(0,0,0,0.04)" : "transparent",
                }}
            >
                <p className="text-base font-semibold">
                    Drag & drop images or videos
                </p>
                <p className="text-sm text-gray-500">
                    Max 10 images • Max 3 videos • 4:3 ratio
                </p>

                <input
                    ref={inputRef}
                    type="file"
                    hidden
                    multiple
                    accept="image/*,video/*"
                    onChange={(e) => handleFiles(e.target.files)}
                />
            </Box>

            {/* Preview Grid */}
            {files.length > 0 && (
                <Box
                    mt={3}
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                        gap: 2.5,
                    }}
                >
                    {files.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                position: "relative",
                                borderRadius: 3,
                                overflow: "hidden",
                                boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                                cursor: "pointer",
                                aspectRatio: "5 / 3",
                            }}
                            onClick={() => setPreviewItem(item)}
                        >
                            {item.type === "video" ? (
                                <video
                                    src={item.preview}
                                    muted
                                    autoPlay
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <img
                                    src={item.preview}
                                    alt="preview"
                                    className="w-full h-full object-cover"
                                />
                            )}

                            {/* Delete */}
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(index);
                                }}
                                sx={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    backgroundColor: "rgba(0,0,0,0.65)",
                                    color: "#fff",
                                    "&:hover": {
                                        backgroundColor: "rgba(255,0,0,0.85)",
                                    },
                                }}
                                size="small"
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    ))}
                </Box>
            )}

            {/* Fullscreen Preview (Image + Video) */}
            {previewItem && (
                <Box
                    onClick={() => setPreviewItem(null)}
                    sx={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(0,0,0,0.9)",
                        zIndex: 2000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <IconButton
                        onClick={() => setPreviewItem(null)}
                        sx={{
                            position: "absolute",
                            top: 20,
                            right: 20,
                            color: "#fff",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {previewItem.type === "video" ? (
                        <video
                            src={previewItem.preview}
                            controls
                            autoPlay
                            className="max-w-[90%] max-h-[90%] rounded-xl"
                        />
                    ) : (
                        <img
                            src={previewItem.preview}
                            alt="full preview"
                            className="max-w-[90%] max-h-[90%] rounded-xl"
                        />
                    )}
                </Box>
            )}
        </>
    );
};

export default MediaDropzone;
