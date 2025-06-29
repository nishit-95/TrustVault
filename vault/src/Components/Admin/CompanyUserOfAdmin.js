// CompanyUserOfAdmin.js
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CompanyUserOfAdmin() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800 });

    fetch("http://localhost:5002/api/CompanyApi/GetAllCompany")
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.error("Error fetching company data:", err));
  }, []);

  const handleAction = (company, action) => {
    Swal.fire({
      icon: "question",
      title: `Are you sure you want to ${action} this company?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:5002/api/CompanyApi/UpdateCompanyStatus", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            c_company_id: company.c_company_id,
            c_status: action === "approve" ? "Approved" : "Rejected",
          }),
        })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to update");
            return res.json();
          })
          .then(() => {
            Swal.fire("Success", `Company ${action}d successfully`, "success");
            setCompanies((prev) =>
              prev.map((c) =>
                c.c_company_id === company.c_company_id
                  ? { ...c, c_status: action === "approve" ? "Approved" : "Rejected" }
                  : c
              )
            );
          })
          .catch(() => {
            Swal.fire("Error", `Failed to ${action} company`, "error");
          });
      }
    });
  };

  useEffect(() => {
    AOS.init({ duration: 800 });
  
    // Dummy data for preview
    const dummyCompanies = [
      { c_company_id: 1, c_company_name: "TechNova", c_email: "info@technova.com", c_country: "India", c_status: "Pending" },
      { c_company_id: 2, c_company_name: "GreenByte", c_email: "hello@greenbyte.io", c_country: "Canada", c_status: "Pending" },
      { c_company_id: 3, c_company_name: "InnoWorks", c_email: "contact@innoworks.org", c_country: "Germany", c_status: "Pending" },
      { c_company_id: 4, c_company_name: "SkyLabs", c_email: "team@skylabs.ai", c_country: "USA", c_status: "Pending" },
      { c_company_id: 5, c_company_name: "NextEdge", c_email: "next@edge.com", c_country: "Japan", c_status: "Pending" },
      { c_company_id: 6, c_company_name: "BrightSoft", c_email: "mail@brightsoft.com", c_country: "UK", c_status: "Pending" },
      { c_company_id: 7, c_company_name: "CyberNest", c_email: "support@cybernest.net", c_country: "France", c_status: "Pending" },
      { c_company_id: 8, c_company_name: "CodeHive", c_email: "code@hive.io", c_country: "Australia", c_status: "Pending" },
      { c_company_id: 9, c_company_name: "DataVista", c_email: "connect@datavista.com", c_country: "India", c_status: "Pending" },
      { c_company_id: 10, c_company_name: "WaveTech", c_email: "info@wavetech.co", c_country: "Brazil", c_status: "Pending" },
    ];
  
    setCompanies(dummyCompanies);
  }, []);  

  return (
    <div className="min-h-screen px-4 py-6 bg-gradient-to-br from-[#fffacc] via-[#ffe0ec] to-[#ffd6e0] dark:from-gray-900 dark:to-black text-gray-800 dark:text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-5 text-center text-[#273c75] dark:text-sky-400">
          Company Users
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {companies.map((company, index) => (
            <div
              key={index}
              data-aos="fade-up"
              className="bg-white/90 dark:bg-gray-800 rounded-xl p-4 shadow-xl border border-gray-300 dark:border-gray-700"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-[#4158d0] dark:text-indigo-300 mb-2">
                {company.c_company_name}
              </h3>
              <p className="text-sm">
                <span className="font-medium">Email:</span> {company.c_email}
              </p>
              <p className="text-sm mb-3">
                <span className="font-medium">Country:</span> {company.c_country}
              </p>

              <div className="flex justify-between gap-3 mt-3">
                <button
                  onClick={() => handleAction(company, "approve")}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(company, "reject")}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}