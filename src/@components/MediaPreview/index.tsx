import IconButton from "@components/IconButton";
import Modal from "@components/Modal";
import ModalHeader from "@components/Modal/ModalHeader";
import ContentPreloader from "@components/Preloader/ContentPreloader";
import { IFile } from "@interface/common.interface";
import { downloadFile } from "@services/utils/file-download.service";
import clsx from "clsx";
import { FC, ReactNode, useState } from "react";
import { makePreviewUrl } from "utility/make-slug";
import { isFileImg, isFilePdf } from "utility/utils";

type MediaPreviewProps = {
  file: IFile | File;
  isExternal?: boolean;
  children: ReactNode | string | ReactNode[];
  openInNewTab?: boolean;
  loadingText?: string;
  className?: string;
  onClose?: (file: IFile | File) => void;
};

const MediaPreview: FC<MediaPreviewProps> = ({
  file,
  isExternal,
  children,
  openInNewTab,
  className,
  onClose,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isMaximized, setMaximized] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [fileURL, setFileURL] = useState<string>("");

  isExternal =
    !(file instanceof File) && file?.previewUrl?.startsWith("blob:")
      ? true
      : isExternal;

  const isFileType = file instanceof File;

  const onModalClose = () => {
    setOpen(false);
    onClose && onClose(file);
  };

  const onOpen = () => {
    if (openInNewTab) {
      window.open(
        file instanceof File
          ? URL.createObjectURL(file)
          : isExternal
          ? file?.previewUrl
          : makePreviewUrl(file?.previewUrl) || "",
        "_blank"
      );
      return;
    }
    if (
      isFileImg(isFileType ? file.type : file?.fileType) ||
      isFilePdf(isFileType ? file.type : file?.fileType)
    ) {
      setLoading(true);
      setOpen(true);
      if (isFileType) {
        setFileURL(URL.createObjectURL(file));
        setLoading(false);
        return;
      }
      fetch(
        isExternal ? file?.previewUrl : makePreviewUrl(file?.previewUrl) || ""
      )
        .then((response) => response.blob())
        .then((blob) => {
          if (
            isFilePdf(isFileType ? file.type : file?.fileType) &&
            window.innerWidth < 700
          ) {
            window.open(URL.createObjectURL(blob), "_blank");
            setOpen(false);
          } else setFileURL(URL.createObjectURL(blob));
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else onDownload();
  };

  const onDownload = () => {
    downloadFile(
      isFileType
        ? file
        : isExternal
        ? file?.previewUrl
        : makePreviewUrl(file?.previewUrl) || "",
      isFileType ? file?.name : file?.originalFileName
    );
  };

  return (
    <>
      <div
        role="button"
        onClick={onOpen}
        style={{ display: "inherit" }}
        className={clsx("w-100", { [className as string]: !!className })}
      >
        {children}
      </div>
      <Modal
        isOpen={isOpen}
        noHeader
        size="xl"
        fullscreen={isMaximized ? true : "md-down"}
      >
        <ModalHeader
          title={
            <h5>
              <IconButton
                iconName="download"
                color="success"
                hoverTitle="ডাউনলোড করুন"
                onClick={onDownload}
                iconSize={15}
              />
              &nbsp;
              {isFileType ? file?.name : file?.originalFileName}
            </h5>
          }
          className="border-secondary"
          handleClose={onModalClose}
          isMaximized={isMaximized}
          onMaximize={() => setMaximized((p) => !p)}
        />
        {!isLoading && (
          <div className="animate__animated animate__fadeIn">
            {isFileImg(isFileType ? file.type : file?.fileType) && (
              <img
                src={fileURL}
                alt={isFileType ? file?.name : file?.originalFileName}
                className="w-100 animate__animated animate__fadeIn"
                loading="lazy"
              />
            )}
            {isFilePdf(isFileType ? file.type : file?.fileType) && (
              <iframe
                src={fileURL}
                style={{ height: "90vh" }}
                className="w-100"
              />
            )}
          </div>
        )}
        <div style={{ height: isLoading ? "80vh" : 0 }}>
          <ContentPreloader
            show={isLoading}
            loaderText="ফাইল প্রস্তুত হচ্ছে..."
          />
        </div>
      </Modal>
    </>
  );
};

export default MediaPreview;
