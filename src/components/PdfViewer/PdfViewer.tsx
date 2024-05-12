import getS3File from '@/constants/get-aws-url';
import React, { useState, useEffect } from 'react';
import { Document, Page ,pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';


const App = ({ s3Url }:any) => {
  const [numPages, setNumPages] = useState(0);

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
  };
  console.log(numPages,"numPages")
  return (
    <div className='overflow-auto'>
      
        <Document
          file={{url : s3Url}}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {/* <Page  pageNumber={2} width={window.innerWidth} /> */}
          {[...Array(numPages)].map((_, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} width={window.innerWidth} />
        ))}
        </Document>
      
      {/* <p>Page {pageNumber} of {numPages}</p> */}
    </div>
  );
};

// Usage
export default function PdfViewer ({pdfUrl,initialPage }:any) {
  const s3Url = pdfUrl;
console.log(s3Url)
  return (
    <div>
      <h1>PDF Viewer</h1>
      <App s3Url={getS3File(pdfUrl)} />
      {/* <iframe src={getS3File(pdfUrl)} title='description' className='h-[80vh] w-full' ></iframe> */}
    </div>
  );
};
