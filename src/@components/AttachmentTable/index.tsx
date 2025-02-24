import Checkbox from "@components/Checkbox";
import MediaPreview from "@components/MediaPreview";
import Separator from "@components/Separator";
import {
  ITableHeadColumn,
  Table,
  TableCell,
  TableRow,
} from "@components/Table";
import { DEFAULT_LINK } from "@constants/common.constant";
import { IFile } from "@interface/common.interface";
import { useState } from "react";
import { isObjectNull } from "utility/check-validation";
import { makePreviewUrl } from "utility/make-slug";
import { generateRowNumBn, isFileImg, isFilePdf } from "utility/utils";

const columns: ITableHeadColumn[] = [
  { title: "Sl No", width: 50 },
  { title: "ফাইল", minWidth: 100 },
];

type AttachmentTableProps = {
  children?: any;
  data?: Array<IFile>;
};

export const AttachmentTable = ({ children, data }: AttachmentTableProps) => {
  const [pdfPreview, setPdfPreview] = useState<boolean>(true);
  const [imgPreview, setImgPreview] = useState<boolean>(true);

  let hasImgOrPdf = false;
  data?.forEach((attach) => {
    if (!hasImgOrPdf)
      hasImgOrPdf = isFilePdf(attach?.fileType) || isFileImg(attach?.fileType);
  });

  if (!data?.length) return <></>;
  return (
    <>
      {hasImgOrPdf ? (
        <div className="d-flex align-items-center justify-content-end gap-3">
          <div>
            <Checkbox
              label="পিডিএফ প্রিভিউ"
              name="showPdfPreview"
              checked={pdfPreview}
              onChange={(e) => setPdfPreview(e.target.checked)}
            />
            <Checkbox
              label="ইমেজ প্রিভিউ"
              name="showImgPreview"
              checked={imgPreview}
              onChange={(e) => setImgPreview(e.target.checked)}
            />
          </div>
        </div>
      ) : null}
      <Table columns={columns}>
        {children
          ? children
          : data?.map((attachment, i: number) => {
              let previewer: boolean =
                (isFilePdf(attachment?.fileType) && pdfPreview) ||
                (isFileImg(attachment?.fileType) && imgPreview);

              return (
                <TableRow key={i}>
                  <TableCell>
                    {/* <RowSerial rowIndex={i} /> */}
                    {previewer ? (
                      <span className="d-flex align-items-center justify-content-center py-3 bg-dark text-white rounded-circle">
                        {generateRowNumBn(i) + "."}
                        {/* {numEnToBn(i + 1) + "."} */}
                      </span>
                    ) : (
                      generateRowNumBn(i)
                    )}
                  </TableCell>
                  <TableCell>
                    {attachment && !isObjectNull(attachment) ? (
                      <>
                        <br />
                        <MediaPreview file={attachment}>
                          <span className="d-flex justify-content-start align-items-justify">
                            {(isFilePdf(attachment?.fileType) && pdfPreview) ||
                            (isFileImg(attachment?.fileType) && imgPreview)
                              ? " "
                              : attachment.originalFileName}
                          </span>
                          {isFilePdf(attachment?.fileType) && pdfPreview ? (
                            <iframe
                              src={
                                attachment
                                  ? makePreviewUrl(attachment)
                                  : DEFAULT_LINK.BLANK_IMG_ABSOLUTE
                              }
                              className="animate__animated animate__fadeIn"
                              style={{ width: "100%", height: 500 }}
                              title={attachment.originalFileName}
                            />
                          ) : isFileImg(attachment?.fileType) && imgPreview ? (
                            <img
                              src={
                                attachment
                                  ? makePreviewUrl(attachment)
                                  : DEFAULT_LINK.BLANK_IMG_ABSOLUTE
                              }
                              className="animate__animated animate__fadeIn"
                              style={{ width: "100%", height: "100%" }}
                              alt={attachment.originalFileName}
                            />
                          ) : null}
                        </MediaPreview>
                        {previewer ? (
                          <>
                            <br /> <br />
                            <p className="fs-3 fw-bold text-primary">
                              {attachment.originalFileName?.split(".")[0]}
                            </p>
                            <Separator />
                          </>
                        ) : (
                          <br />
                        )}
                      </>
                    ) : (
                      "No Attachment Avialable"
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
      </Table>
    </>
  );
};
