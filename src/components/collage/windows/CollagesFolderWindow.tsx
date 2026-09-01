"use client";

import Image from "next/image";
import type { CSSProperties, SyntheticEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import type { PositionedWindowProps } from "@/components/collage/windows/Win98Window";
import { Win98Window } from "@/components/collage/windows/Win98Window";

const collageImages = Array.from({ length: 31 }, (_, index) => {
  const fileNumber = index + 1;
  return {
    name: `${fileNumber}.jpg`,
    src: `/assets/collages/${fileNumber}.jpg`,
  };
});

type ImageDimensions = {
  width: number;
  height: number;
};

type ViewerWindowSize = ImageDimensions & {
  left: number;
  top: number;
};

const TASKBAR_HEIGHT = 38;
const WINDOW_MARGIN = 16;
const VIEWER_CHROME_HEIGHT = 176;
const VIEWER_HORIZONTAL_INSET = 32;

export function CollagesFolderWindow({ style, ...windowProps }: PositionedWindowProps) {
  const [openImage, setOpenImage] = useState<(typeof collageImages)[number] | null>(null);
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions | null>(null);
  const [viewerWindowSize, setViewerWindowSize] = useState<ViewerWindowSize | null>(null);

  const calculateViewerWindowSize = useCallback((dimensions: ImageDimensions) => {
    const usableDesktopHeight = window.innerHeight - TASKBAR_HEIGHT;
    const maxWindowWidth = Math.min(window.innerWidth * 0.85, window.innerWidth - WINDOW_MARGIN * 2);
    const maxWindowHeight = Math.min(
      usableDesktopHeight * 0.85,
      usableDesktopHeight - WINDOW_MARGIN * 2
    );
    const maxImageWidth = Math.max(1, maxWindowWidth - VIEWER_HORIZONTAL_INSET);
    const maxImageHeight = Math.max(1, maxWindowHeight - VIEWER_CHROME_HEIGHT);
    const scale = Math.min(
      maxImageWidth / dimensions.width,
      maxImageHeight / dimensions.height
    );
    const width = Math.round(dimensions.width * scale + VIEWER_HORIZONTAL_INSET);
    const height = Math.round(dimensions.height * scale + VIEWER_CHROME_HEIGHT);

    setViewerWindowSize({
      width,
      height,
      left: Math.max(WINDOW_MARGIN, Math.round((window.innerWidth - width) / 2)),
      top: Math.max(WINDOW_MARGIN, Math.round((usableDesktopHeight - height) / 2)),
    });
  }, []);

  useEffect(() => {
    if (!openImage || !imageDimensions) return;
    calculateViewerWindowSize(imageDimensions);
    const updateViewerSize = () => calculateViewerWindowSize(imageDimensions);
    window.addEventListener("resize", updateViewerSize);
    return () => window.removeEventListener("resize", updateViewerSize);
  }, [calculateViewerWindowSize, imageDimensions, openImage]);

  const openCollage = useCallback((image: (typeof collageImages)[number]) => {
    const previewImage = new window.Image();
    previewImage.onload = () => {
      const dimensions = {
        width: previewImage.naturalWidth,
        height: previewImage.naturalHeight,
      };
      setImageDimensions(dimensions);
      calculateViewerWindowSize(dimensions);
      setOpenImage(image);
    };
    previewImage.src = image.src;
  }, [calculateViewerWindowSize]);

  const openImageIndex = openImage
    ? collageImages.findIndex((image) => image.src === openImage.src)
    : -1;

  const showAdjacentImage = useCallback((direction: -1 | 1) => {
    if (openImageIndex < 0) return;
    const nextImage = collageImages[openImageIndex + direction];
    if (nextImage) openCollage(nextImage);
  }, [openCollage, openImageIndex]);

  useEffect(() => {
    if (!openImage || windowProps.interaction?.status !== "open" || !windowProps.interaction.isActive) return;
    const handleKeyboardNavigation = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && openImageIndex > 0) {
        event.preventDefault();
        showAdjacentImage(-1);
      }
      if (event.key === "ArrowRight" && openImageIndex < collageImages.length - 1) {
        event.preventDefault();
        showAdjacentImage(1);
      }
    };
    window.addEventListener("keydown", handleKeyboardNavigation);
    return () => window.removeEventListener("keydown", handleKeyboardNavigation);
  }, [openImage, openImageIndex, showAdjacentImage, windowProps.interaction?.isActive, windowProps.interaction?.status]);

  const returnToFolder = () => {
    setOpenImage(null);
    setImageDimensions(null);
    setViewerWindowSize(null);
  };

  const handleImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    const dimensions = {
      width: event.currentTarget.naturalWidth,
      height: event.currentTarget.naturalHeight,
    };
    setImageDimensions(dimensions);
    calculateViewerWindowSize(dimensions);
  };

  const viewerStyle: CSSProperties | undefined = openImage && viewerWindowSize
    ? {
        ...style,
        left: viewerWindowSize.left,
        top: viewerWindowSize.top,
        width: viewerWindowSize.width,
        height: viewerWindowSize.height,
    }
    : style;

  const viewerInteraction = windowProps.interaction
    ? {
        ...windowProps.interaction,
        onClose: () => {
          returnToFolder();
          windowProps.interaction?.onClose();
        },
      }
    : undefined;

  return (
    <Win98Window
      key={openImage?.src ?? "collages-folder"}
      {...windowProps}
      style={viewerStyle}
      interaction={viewerInteraction}
      title={openImage ? `${openImage.name} — Picture Viewer` : "Collages"}
    >
      <div className="collages-folder-app">
        <div className="win98-menubar">File&nbsp;&nbsp; Edit&nbsp;&nbsp; View&nbsp;&nbsp; Favorites&nbsp;&nbsp; Help</div>
        <div className="collages-folder-toolbar">
          <button
            type="button"
            className="collages-folder-tool"
            disabled={!openImage}
            onClick={returnToFolder}
          >
            ← Back
          </button>
          {openImage ? (
            <>
              <button
                type="button"
                className="collages-folder-tool is-navigation"
                aria-label="Previous picture"
                title="Previous picture (Left Arrow)"
                disabled={openImageIndex <= 0}
                onClick={() => showAdjacentImage(-1)}
              >
                ◀
              </button>
              <button
                type="button"
                className="collages-folder-tool is-navigation"
                aria-label="Next picture"
                title="Next picture (Right Arrow)"
                disabled={openImageIndex >= collageImages.length - 1}
                onClick={() => showAdjacentImage(1)}
              >
                ▶
              </button>
            </>
          ) : null}
          <span>│</span>
          <span>Folders</span>
          <span>▦ Views</span>
        </div>
        <div className="collages-folder-address">
          <span>Address</span>
          <div className="win98-field">▣ &nbsp;C:\HEWEN\COLLAGES</div>
        </div>

        {openImage ? (
          <div className="collages-picture-viewer">
            <Image
              src={openImage.src}
              alt={openImage.name}
              fill
              sizes="45vw"
              priority
              unoptimized
              onLoad={handleImageLoad}
            />
          </div>
        ) : (
          <div className="collages-folder-content">
            {collageImages.map((image) => (
              <button
                key={image.src}
                type="button"
                className="collages-file"
                onDoubleClick={() => openCollage(image)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") openCollage(image);
                }}
              >
                <span className="collages-file-thumbnail">
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="140px"
                  />
                </span>
                <span>{image.name}</span>
              </button>
            ))}
          </div>
        )}

        <div className="collages-folder-status">
          {openImage ? openImage.name : `${collageImages.length} object${collageImages.length === 1 ? "" : "s"}`}
        </div>
      </div>
    </Win98Window>
  );
}
