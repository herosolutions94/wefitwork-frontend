import React from "react";
import { cmsFileUrl } from "../helpers/helpers";

export default function FileIconsByExtensyion({ file, display_name }) {
  const getFileExtension = (filename) => {
    const parts = filename?.split(".");
    return parts[parts.length - 1]?.toLowerCase();
  };
  const extension = getFileExtension(file);

  return (
    <>
      {["jpg", "jpeg", "png", "gif"].includes(extension) ? (
        <a
          className="images_contain"
          href={cmsFileUrl(file, "msg_attachments")}
          target="_blank"
          download
        >
          <div className="image">
            <img src={cmsFileUrl(file, "msg_attachments")} />
          </div>
          {/* <a href={cmsFileUrl(file, "msg_attachments")} className="download_btn" target="_blank" download>Download</a> */}
        </a>
      ) : extension === "doc" || extension === "docx" ? (
        <a
          className="attachment_document flex"
          href={cmsFileUrl(file, "msg_attachments")}
          target="_blank"
          download
        >
          <div className="icon">
            <img src="/images/file_icon/doc.png" alt="attachment document" />
          </div>
          <span>{display_name}</span>
        </a>
      ) : extension === "pdf" ? (
        <a
          className="attachment_document flex"
          href={cmsFileUrl(file, "msg_attachments")}
          target="_blank"
          download
        >
          <div className="icon">
            <img src="/images/file_icon/pdf.png" alt="attachment document" />
          </div>
          <span>{display_name}</span>
        </a>
      ) : extension === "xls" || extension === "xlsx" || extension === "csv" ? (
        <a
          className="attachment_document flex"
          href={cmsFileUrl(file, "msg_attachments")}
          target="_blank"
          download
        >
          <div className="icon">
            <img src="/images/file_icon/xls.png" alt="attachment document" />
          </div>
          <span>{display_name}</span>
        </a>
      ) : (
        <a
          className="attachment_document flex"
          href={cmsFileUrl(file, "msg_attachments")}
          target="_blank"
          download
        >
          <div className="icon">
            <img src="/images/file_icon/file.png" alt="attachment document" />
          </div>
          <span>{display_name}</span>
        </a>
      )}
    </>
  );
}
