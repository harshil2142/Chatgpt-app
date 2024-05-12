import React, { useState, useEffect } from 'react';
import { Document, Page ,pdfjs  } from 'react-pdf';


const PdfViewer = ({ pdfUrl, initialPage }:{pdfUrl : string , initialPage : number}) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(initialPage || 1);

  useEffect(() => {
    if (!initialPage) {
      setPageNumber(1);
    }
  }, [pdfUrl, initialPage]);

  function onDocumentLoadSuccess({ numPages }:any) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document renderMode='canvas' file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} width={500} />
      </Document>
    </div>
  );
};

export default PdfViewer;
