import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function MyData() {
  const [selectedDoc, setSelectedDoc] = useState("");
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [docTypes, setDocTypes] = useState([]);
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
  }, []);

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
    formData.append("c_document_id", 0); // auto-incremented on backend
    formData.append("c_user_id", 0); // backend will override with token
    formData.append("c_data_id", c_data_id);
    formData.append("c_document_name", file.name);
    formData.append("c_file_url", ""); // workaround: send empty string to satisfy backend
    formData.append("c_mime_type", ""); // backend sets this too
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

      const result = await response.json();

      const newEntry = {
        id: documents.length + 1,
        name: result.c_document_name || file.name,
        type: selectedDoc,
      };

      setDocuments([...documents, newEntry]);
      setFile(null);
      setSelectedDoc("");
      fileInputRef.current.value = "";
      alert("File uploaded successfully.");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Please try again.");
    }
  };

  const handleDelete = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
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
              ref={fileInputRef}
              onChange={handleFileChange}
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
            />
          </div>

          <button
            onClick={handleUpload}
            className="bg-primary text-white px-6 py-3 rounded-md shadow-md hover:scale-105 transition-transform"
            data-aos="zoom-in"
          >
            Submit
          </button>
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
                    key={doc.id}
                    className="border-b border-gray-300 dark:border-gray-700"
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{doc.name}</td>
                    <td className="p-4">{doc.type}</td>
                    <td className="p-4 space-x-4">
                      <button className="text-green-600 hover:underline">
                        View
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(doc.id)}
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
    </div>
  );
}
