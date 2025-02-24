import clsx from "clsx";
import React, { useState } from "react";
type Props = {
  text: string;
  lines?: number;
  averageCharacterPerLine?: number;
  className?: string;
};

const ReadMore: React.FC<Props> = ({
  text,
  lines = 1,
  averageCharacterPerLine = 25,
  className = "fs-5",
}) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleIsTruncated = () => {
    setIsTruncated(!isTruncated);
  };

  const renderText = () => {
    // This is an estimate, adjust as needed
    const maxCharacters = lines * averageCharacterPerLine;
    if (text.length < maxCharacters) return text;
    return isTruncated ? `${text.substring(0, maxCharacters)}...` : text;
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <p className={clsx(className)}>
        {renderText()}
        <span
          className={clsx(
            "text-primary cursor-pointer text-decoration-underline",
            isTruncated ? "d-none" : "d-inline"
          )}
          onClick={toggleIsTruncated}
        >
          ...সংক্ষেপ করুন
        </span>
        {text.length > lines * averageCharacterPerLine && (
          <span
            className={clsx(
              "text-primary cursor-pointer text-decoration-underline",
              !isTruncated ? "d-none" : "d-inline"
            )}
            onClick={toggleIsTruncated}
          >
            আরো পড়ুন
          </span>
        )}
      </p>
    </div>
  );
};

export default ReadMore;
