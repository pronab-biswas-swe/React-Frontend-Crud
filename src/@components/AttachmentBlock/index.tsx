import { AttachmentTable } from "@components/AttachmentTable";
import Collapsable from "@components/Collapsable";
import MediaPreview from "@components/MediaPreview";
import { DEFAULT_LINK } from "@constants/common.constant";
import { IFile } from "@interface/common.interface";
import { isFileImg, isFilePdf, isObjectNull } from "utility/check-validation";
import { makePreviewUrl } from "utility/make-slug";

type IAttachmentBlockProps = {
  attachments: Array<IFile>;
  children?: any;
};

export const AttachmentBlock = ({
  attachments,
  children,
}: IAttachmentBlockProps) => {
  const attachmentsNotEmpty: boolean = attachments && attachments.length > 0;
  return (
    <div className="card border p-4">
      {children ? (
        children
      ) : attachmentsNotEmpty ? (
        <Collapsable
          id="attachments"
          title={"Attachment"}
          titleClass="fs-3 fw-bold"
          hasContent={attachmentsNotEmpty}
        >
          {attachmentsNotEmpty ? (
            // Has File
            attachments.length > 1 ? (
              // Multiple Files
              <AttachmentTable data={attachments} />
            ) : // Single File
            attachments[0] && !isObjectNull(attachments[0]) ? (
              <MediaPreview file={attachments[0]}>
                <span>
                  {isFilePdf(attachments[0]?.fileType) ||
                  isFileImg(attachments[0]?.fileType)
                    ? " "
                    : attachments[0].originalFileName}
                </span>
                {isFilePdf(attachments[0]?.fileType) ? (
                  <iframe
                    src={
                      attachments[0]
                        ? makePreviewUrl(attachments[0])
                        : DEFAULT_LINK.BLANK_IMG_ABSOLUTE
                    }
                    className="animate__animated animate__fadeIn"
                    style={{ width: "100%", height: 500 }}
                    title={attachments[0].originalFileName}
                  />
                ) : isFileImg(attachments[0]?.fileType) ? (
                  <img
                    src={
                      attachments[0]
                        ? makePreviewUrl(attachments[0])
                        : DEFAULT_LINK.BLANK_IMG_ABSOLUTE
                    }
                    className="animate__animated animate__fadeIn"
                    style={{ width: "100%", height: "100%" }}
                    alt="ok"
                  />
                ) : null}
              </MediaPreview>
            ) : (
              "No Attachment Available"
            )
          ) : (
            "No Attachment Available"
          )}
        </Collapsable>
      ) : (
        <div className="d-flex justify-content-start">
          <label className="fs-4 mb-1 fw-bold">{"Attachment"}</label>
          <label className="fs-5 mx-5 my-1">{"No Attachment Available"}</label>
        </div>
      )}
    </div>
  );
};
