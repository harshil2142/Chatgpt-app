// src/PdfViewer.js
import React, { useEffect, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";

const PdfViewer = ({ url, initialPage }: any) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { jumpToPage } = pageNavigationPluginInstance;

  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    if (page !== undefined && jumpToPage) {
      jumpToPage(page);
    }
  }, [page, jumpToPage]);

  return (
    <div className="h-[60vh] w-full">
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
      >
        <Viewer
          fileUrl={url}
          plugins={[defaultLayoutPluginInstance, pageNavigationPluginInstance]}
        />
      </Worker>
    </div>
  );
};

export default PdfViewer;
