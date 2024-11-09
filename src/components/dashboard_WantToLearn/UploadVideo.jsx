import { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";

export const UploadNotes = (props) => {
  const [pdfFiles, setPdfFiles] = useState([]);

  const langid=props.lang

  useEffect(() => {
    // Fetch the uploaded PDF files from the server based on langid
    const fetchPdfFiles = async () => {
      try {
        const response = await axios.get(`/fetch-public-files/${langid}`);
        if (response.data.success) {
          const fetchedPdfFiles = response.data.pdfFiles; // Assuming server sends the array of PDF files
          setPdfFiles(fetchedPdfFiles);
        } else {
          console.error("Failed to fetch PDF files");
        }
      } catch (error) {
        console.error("Error fetching PDF files:", error);
      }
    };

    fetchPdfFiles();
  }, [langid]);


  const handleEmbedClick = (pdfFile) => {
    // Convert buffer data to a Uint8Array
    console.log(pdfFile.filename)
    const uint8Array = new Uint8Array(pdfFile.data.data);

    // Create a Blob object from Uint8Array with filename
    const pdfBlob = new Blob([uint8Array], { type: pdfFile.contentType });

    // Create a URL for the Blob object
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Open the PDF file in a new window with filename
    const newWindow = window.open(pdfUrl, "_blank");
    if (newWindow) {
        newWindow.document.title = pdfFile.filename;
        console.log(newWindow.document) // Set the title of the new window to the filename
    } else {
        console.error("Failed to open PDF in new window");
    }
};




  return (
    <div className="uploads">
      {pdfFiles.length > 0 ? (
        pdfFiles.map((pdfFile, index) => (
          <div key={index} className="pdf-container">
            <embed
              className="uploads-pdfs-fetch"
              src={URL.createObjectURL(new Blob([pdfFile.data], { type: pdfFile.contentType }))}
              width="100%"
              height="100%"
              type="application/pdf"
            />
            <span className="embedview" onClick={() => handleEmbedClick(pdfFile)}>
             <span>{pdfFile.filename}</span><span id="viewww">view</span> 
            </span>
          </div>
        ))
      ) : (
        <div>No PDF files available</div>
      )}
    </div>
  );
};
