// MyData.js
import React, { useState, useRef, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyData() {
  const [selectedDoc, setSelectedDoc] = useState("");
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [docTypes, setDocTypes] = useState([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef();

  useEffect(() => {
    AOS.init({ duration: 600 });
    const token = localStorage.getItem("token");
    fetch("http://localhost:5002/api/UserApi/GetDataTypesAsync", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setDocTypes(data))
      .catch(() => setDocTypes([]));
    fetchDocuments();
  }, []);

  const fetchDocuments = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5002/api/UserApi/GetUserDocuments", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setDocuments(data))
      .catch(() => setDocuments([]));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedDoc || !file) {
      alert("Please select both document type and file.");
      return;
    }

    const token = localStorage.getItem("token");
    const selectedType = docTypes.find((t) => t.c_data_name === selectedDoc);
    const c_data_id = selectedType ? selectedType.c_data_id : 1;

    const formData = new FormData();
    formData.append("c_document_id", 0);
    formData.append("c_user_id", 0);
    formData.append("c_data_id", c_data_id);
    formData.append("c_document_name", file.name);
    formData.append("c_file_url", "");
    formData.append("c_mime_type", "");
    formData.append("c_is_active", true);
    formData.append("c_uploaded_at", new Date().toISOString());
    formData.append("c_file", file);

    try {
      const response = await fetch(
        "http://localhost:5002/api/UserApi/UploadDocument",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText);
      }

      fetchDocuments();
      setFile(null);
      setSelectedDoc("");
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };

  const handleDelete = (id) => {
    setDocuments(documents.filter((doc) => doc.c_document_id !== id));
  };

  const renderFilePreview = (url) => {
    if (url.match(/\.(jpeg|jpg|png|gif)$/i)) {
      return (
        <img src={url} alt="Preview" className="w-full h-full object-contain" />
      );
    } else {
      return <iframe src={url} title="Preview" className="w-full h-full" />;
    }
  };

  return (
    <div className="min-h-screen px-6 py-8 bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black text-foreground dark:text-white transition-colors duration-300">
      <div
        className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 mb-10"
        data-aos="fade-up"
      >
        <h2 className="text-2xl font-bold mb-6 text-primary">
          Upload Document
        </h2>

        <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6 items-end">
          <div>
            <label className="block mb-2 font-medium">
              Select Document Type
            </label>
            <select
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
              value={selectedDoc}
              onChange={(e) => setSelectedDoc(e.target.value)}
            >
              <option value="">-- Select Document --</option>
              {docTypes.map((type) => (
                <option key={type.c_data_id} value={type.c_data_name}>
                  {type.c_data_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Select File</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleUpload}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md shadow-md transition-transform hover:scale-105 w-full"
              data-aos="zoom-in"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <div
        className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6"
        data-aos="fade-up"
      >
        <h2 className="text-2xl font-bold mb-6 text-primary">
          Uploaded Documents
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-800 text-left">
                <th className="p-4">Sr. No</th>
                <th className="p-4">Document Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.length > 0 ? (
                documents.map((doc, index) => (
                  <tr
                    key={doc.c_document_id}
                    className="border-b border-gray-300 dark:border-gray-700"
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{doc.c_document_name}</td>
                    <td className="p-4">
                      {docTypes.find((dt) => dt.c_data_id === doc.c_data_id)
                        ?.c_data_name || doc.c_data_id}
                    </td>
                    <td className="p-4 space-x-4">
                      {doc.c_file_url && (
                        <>
                          <button
                            className="text-blue-600 hover:underline"
                            onClick={() =>
                              setPreviewUrl(
                                `http://localhost:5002/${doc.c_file_url}`
                              )
                            }
                          >
                            View
                          </button>
                          <a
                            href={`http://localhost:5002/${doc.c_file_url}`}
                            className="text-green-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                            download={doc.c_document_name}
                          >
                            Download
                          </a>
                        </>
                      )}
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(doc.c_document_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No documents uploaded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for File Preview */}
      {previewUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[90%] h-[90%] relative p-4 overflow-auto">
            <button
              onClick={() => setPreviewUrl("")}
              className="absolute top-3 right-4 text-red-600 font-bold text-lg"
            >
              ✕
            </button>
            {renderFilePreview(previewUrl)}
          </div>
        </div>
      )}
    </div>
  );
};
