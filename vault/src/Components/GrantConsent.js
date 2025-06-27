import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";

export default function GrantConsent() {
  const [company, setCompany] = useState("");
  const [dataType, setDataType] = useState("");
  const [purpose, setPurpose] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [partners, setPartners] = useState([]);
  const [dataTypes, setDataTypes] = useState([]);
  const [userDataTypeIds, setUserDataTypeIds] = useState([]); // Store user's data type ids

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = "/login"; // Redirect if no token
      return;
    }
    AOS.init({ duration: 1000 });

    fetch("http://localhost:5002/api/PartnerApi/GetAllPartners", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPartners(data))
      .catch(() => setPartners([]));

    // Fetch all data types
    fetch("http://localhost:5002/api/UserApi/GetDataTypesAsync", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setDataTypes(data))
      .catch(() => setDataTypes([]));

    // Fetch user documents and extract data type ids
    fetch("http://localhost:5002/api/UserApi/GetUserDocuments", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((docs) => {
        const ids = docs.map((doc) => doc.c_data_id);
        setUserDataTypeIds(ids);
      })
      .catch(() => setUserDataTypeIds([]));
  }, []);

  const handleSubmit = () => {
    if (!company || !dataType || !purpose || !startTime || !endTime) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill all the fields before submitting!",
        timer: 2000,
        showConfirmButton: false,
        position: "center",
      });
      return;
    }

    const consentInfo = {
      company,
      dataType,
      purpose,
      startTime,
      endTime,
    };

    console.log("Consent Given:", consentInfo);
    Swal.fire({
      icon: "success",
      title: "Consent submitted successfully!",
      position: "center",
      confirmButtonText: "OK",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: true,
      timer: undefined,
    }).then(() => {
      // Reset form fields after user clicks OK
      setCompany("");
      setDataType("");
      setPurpose("");
      setStartTime("");
      setEndTime("");
    });

    // Add API logic here if needed
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-6 py-10 bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-black text-foreground dark:text-white transition-colors duration-300">
        <div
          className="w-full max-w-2xl bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8"
          data-aos="zoom-in"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            Grant Consent
          </h2>

          <div className="space-y-6">
            {/* Company List */}
            <div>
              <label className="block mb-2 font-medium">Select Company</label>
              <select
                className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              >
                <option value="">-- Choose Company --</option>
                {partners.map((p) => (
                  <option key={p.c_partner_id} value={p.c_partner_name}>
                    {p.c_partner_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Data To Share */}
            <div>
              <label className="block mb-2 font-medium">Data to Share</label>
              <select
                className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                value={dataType}
                onChange={(e) => setDataType(e.target.value)}
              >
                <option value="">-- Select Data Type --</option>
                {dataTypes
                  .filter((dt) => userDataTypeIds.includes(dt.c_data_id))
                  .map((dt) => (
                    <option key={dt.c_data_id} value={dt.c_data_name}>
                      {dt.c_data_name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Purpose */}
            <div>
              <label className="block mb-2 font-medium">Purpose</label>
              <input
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="e.g. Verification, KYC"
                className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
              />
            </div>

            {/* Duration */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">Start Time</label>
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">End Time</label>
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <label className="block mb-2 font-medium invisible">Submit</label>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 shadow-md"
              >
                Submit Consent
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}