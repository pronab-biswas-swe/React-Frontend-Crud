import MediaPreview from "@components/MediaPreview";
import Thumb from "@components/Thumb";
import { DATE_PATTERN } from "@constants/common.constant";
import { FC } from "react";
import { notNullOrUndefined } from "utility/check-validation";
import { makePreviewUrl } from "utility/make-slug";
import { generateDateFormat } from "utility/splitDate";

type IDataComparisonProps = {
  d1: any;
  d2: any;
  isBoolean?: boolean;
  trueValue?: string;
  falseValue?: string;
  isDate?: boolean;
  isThumb?: boolean;
  isFile?: boolean;
  title: string;
  isVisible?: boolean;
  showBorder?: boolean;
};

const DataComparison: FC<IDataComparisonProps> = ({
  d1,
  d2,
  isBoolean = false,
  trueValue,
  falseValue,
  isDate = false,
  isThumb = false,
  isFile = false,
  title,
  isVisible = true,
  showBorder = false,
}) => {
  return (
    <>
      {d1 === false || d2 === false || d1 || d2 ? (
        d1 === d2 && !isVisible ? null : isFile &&
          !d1?.previewUrl &&
          !d2?.previewUrl &&
          isVisible ? null : isThumb && d1 === d2 && !isVisible ? null : (
          <div
            className={`row ${
              showBorder
                ? "border border-top-1 border-right-0 border-bottom-1 border-left-0"
                : ""
            }`}
          >
            <div className="col-5 text-end">
              <p className="fs-4 mb-0 fw-bold">{title}:</p>
            </div>
            <div className="col-7">
              <span className="fs-4 mb-0">
                {d1 === d2 ? (
                  (isThumb && (
                    <Thumb
                      className="me-md-3 mb-md-0 mb-3"
                      label="ছবি"
                      imgSrc={d1 ? makePreviewUrl(d1) : "Not Assign"}
                      size={150}
                      keepOriginalRatio
                    />
                  )) ||
                  (isFile && d1?.previewUrl === d2?.previewUrl && (
                    <MediaPreview file={d1}>
                      <span className="text-decoration-line-through text-danger me-3 fs-6">
                        {d1?.originalFileName}
                      </span>
                    </MediaPreview>
                  )) ||
                  (isDate &&
                    (d1
                      ? generateDateFormat(d1, DATE_PATTERN.STANDARD)
                      : "Not Assign")) ||
                  (isBoolean &&
                    (d1 ? trueValue || "হ্যাঁ" : falseValue || "না")) ||
                  d1
                ) : (
                  <>
                    {isThumb ? (
                      <>
                        <Thumb
                          className="me-md-3 mb-md-0 mb-3 border-2"
                          label="ছবি"
                          imgSrc={d1 ? makePreviewUrl(d1) : "Not Assign"}
                          size={150}
                          borderColor="danger"
                          keepOriginalRatio
                        />
                        <Thumb
                          className="border-2"
                          label="ছবি"
                          imgSrc={d2 ? makePreviewUrl(d2) : "Not Assign"}
                          size={150}
                          borderColor="success"
                          keepOriginalRatio
                        />
                      </>
                    ) : isFile ? (
                      <>
                        {d1?.previewUrl !== d2?.previewUrl ? (
                          <>
                            {d1?.previewUrl ? (
                              <MediaPreview file={d1}>
                                <span className="text-decoration-line-through text-danger me-3 fs-6">
                                  {d1?.originalFileName}
                                </span>
                              </MediaPreview>
                            ) : (
                              <span className="text-decoration-line-through text-danger me-3">
                                {"Not Assign"}
                              </span>
                            )}
                            <MediaPreview file={d2}>
                              <span className="text-primary fs-6">
                                {d2?.originalFileName}
                              </span>
                            </MediaPreview>
                          </>
                        ) : d1?.originalFileName ? (
                          <MediaPreview file={d1}>
                            <span className="text-primary fs-6">
                              {d1?.originalFileName}
                            </span>
                          </MediaPreview>
                        ) : (
                          "Not Assign"
                        )}
                      </>
                    ) : (
                      <>
                        <span className="text-decoration-line-through text-danger me-3">
                          {isDate
                            ? d1
                              ? generateDateFormat(d1, DATE_PATTERN.STANDARD)
                              : "Not Assign"
                            : isBoolean
                            ? notNullOrUndefined(d1)
                              ? d1
                                ? trueValue || "হ্যাঁ"
                                : falseValue || "না"
                              : "Not Assign"
                            : d1 || "Not Assign"}
                        </span>
                        {isDate
                          ? d2
                            ? generateDateFormat(d2, DATE_PATTERN.STANDARD)
                            : "Not Assign"
                          : isBoolean
                          ? notNullOrUndefined(d2)
                            ? d2
                              ? trueValue || "হ্যাঁ"
                              : falseValue || "না"
                            : null
                          : d2}
                      </>
                    )}
                  </>
                )}
              </span>
            </div>
          </div>
        )
      ) : (
        <div
          className={`row ${
            showBorder
              ? "border border-top-1 border-right-0 border-bottom-1 border-left-0"
              : ""
          }`}
        >
          <div className="col-5 text-end">
            <p className="fs-4 mb-0 fw-bold">{title}:</p>
          </div>
          <div className="col-7">
            <span className="fs-4 mb-0">{"Not Assign"}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default DataComparison;
