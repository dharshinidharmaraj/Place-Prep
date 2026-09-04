
import { useEffect, useState } from "react";

function AdminDocuments() {
  const [documents, setDocuments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/documents"
      );

      const data = await response.json();

      if (response.ok) {
        setDocuments(data);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);

      setMessage("Unable to load documents");
    }
  };

  return (
    <div>

      <h2>Student Documents</h2>

      {message && (
        <p>{message}</p>
      )}

      {documents.length === 0 && !message && (
        <p>No documents uploaded yet.</p>
      )}

      {documents.length > 0 && (
        <table border="1" cellPadding="10">

          <thead>
            <tr>
              <th>Student Name</th>
              <th>Roll Number</th>
              <th>Document Type</th>
              <th>File Name</th>
              <th>Uploaded On</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {documents.map((document) => (
              <tr key={document._id}>

                <td>
                  {document.studentId?.name || "Unknown"}
                </td>

                <td>
                  {document.rollNumber}
                </td>

                <td>
                  {document.documentType}
                </td>

                <td>
                  {document.fileName}
                </td>

                <td>
                  {new Date(
                    document.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>
                  <a
                  href={`http://localhost:5000/${document.filePath.replace(/\\/g, "/")}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                </td>

              </tr>
            ))}

          </tbody>

        </table>
      )}

    </div>
  );
}

export default AdminDocuments;

