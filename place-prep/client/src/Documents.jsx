import { API_BASE_URL } from "./api";
import { useState } from "react";
import "./Documents.css";

function Documents() {
  const [documentType, setDocumentType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  // Temporary username for testing
  const username = "24BCS102";

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      setMessage("");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!documentType) {
      setMessage("Please select a document type.");
      return;
    }

    if (!selectedFile) {
      setMessage("Please select a file.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();

      formData.append("username", username);
      formData.append("documentType", documentType);
      formData.append("document", selectedFile);

      const response = await fetch(
        `${API_BASE_URL}/api/documents/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Document uploaded successfully!");

        console.log("Upload response:", data);

        setDocumentType("");
        setSelectedFile(null);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Unable to connect to the server.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="documents-page">

      <h1>My Documents</h1>

      <p>Upload your placement documents</p>

      <form onSubmit={handleUpload}>

        <label>Document Type</label>

        <select
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
        >
          <option value="">Select document type</option>

          <option value="10th Mark Sheet">
            10th Mark Sheet
          </option>

          <option value="12th Mark Sheet">
            12th Mark Sheet
          </option>

          <option value="College Mark Sheet">
            College Mark Sheet
          </option>

          <option value="Resume">
            Resume
          </option>

          <option value="Certificate">
            Certificate
          </option>

          <option value="Offer Letter">
            Offer Letter
          </option>

          <option value="Other">
            Other
          </option>
        </select>

        <label>Choose File</label>

        <input
          type="file"
          onChange={handleFileChange}
        />

        {selectedFile && (
          <p>
            Selected file: {selectedFile.name}
          </p>
        )}

        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>

      </form>

      {message && (
        <p className="upload-message">
          {message}
        </p>
      )}

    </div>
  );
}

export default Documents;