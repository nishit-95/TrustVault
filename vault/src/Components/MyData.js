import React, { useState } from "react";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyData() {
  const [selectedDoc, setSelectedDoc] = useState("");
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedDoc || !file) {
      toast.error("Please select a document type and choose a file!", {
        position: "top-center",
      });
      return;
    }

    const newEntry = {
      id: documents.length + 1,
      name: file.name,
      type: selectedDoc,
    };

    setDocuments([...documents, newEntry]);
    setFile(null);
    setSelectedDoc("");
    toast.success("Document uploaded successfully!", {
      position: "top-center",
    });
  };

  const handleDelete = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
    toast.info("Document deleted", { position: "top-center" });
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen px-6 py-8 bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black text-foreground dark:text-white transition-colors duration-300">
        <div
          className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 mb-10"
          data-aos="fade-up"
        >
          <h2 className="text-2xl font-bold mb-6 text-primary">Upload Document</h2>

          <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6 items-end">
            <div>
              <label className="block mb-2 font-medium">Select Document Type</label>
              <select
                className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                value={selectedDoc}
                onChange={(e) => setSelectedDoc(e.target.value)}
              >
                <option value="">-- Select Document --</option>
                <option value="Aadhaar Card">Aadhaar Card</option>
                <option value="PAN Card">PAN Card</option>
                <option value="Driving License">Driving License</option>
                <option value="Passport">Passport</option>
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

        <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6" data-aos="fade-up">
          <h2 className="text-2xl font-bold mb-6 text-primary">Uploaded Documents</h2>
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
                {documents.map((doc, index) => (
                  <tr key={doc.id} className="border-b border-gray-300 dark:border-gray-700">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{doc.name}</td>
                    <td className="p-4">{doc.type}</td>
                    <td className="p-4 space-x-4">
                      <button className="text-green-600 hover:underline">View</button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(doc.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {documents.length === 0 && (
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
    </>
  );
}