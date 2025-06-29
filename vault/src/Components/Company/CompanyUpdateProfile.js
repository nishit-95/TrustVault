// CompanyUpdateProfilePage.js
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";

const countries = [
  "India",
  "United States",
  "Canada",
  "Germany",
  "Australia",
  "Japan",
  "France"
];

export default function CompanyUpdateProfilePage() {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "company@example.com",
    phone: "",
    country: "",
  });

  const [errors, setErrors] = useState({});
  const [companyObj, setCompanyObj] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = "/company-login";
      return;
    }

    AOS.init({ duration: 1200, once: false });

    fetch("http://localhost:5002/api/CompanyApi/GetCompanyById", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((company) => {
        setCompanyObj(company);
        setFormData({
          companyName: company.c_company_name || "",
          email: company.c_email || "",
          phone: company.c_phone || "",
          country: company.c_country || "",
        });
      })
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "companyName" && value.length > 40) return;
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    else if (!/^[A-Za-z0-9 &()'-]+$/.test(formData.companyName)) newErrors.companyName = "Invalid characters";
    else if (formData.companyName.length > 40) newErrors.companyName = "Max 40 characters";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Must be 10 digits";

    if (!formData.country) newErrors.country = "Please select a country";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const token = localStorage.getItem('token');
      if (!companyObj) return;

      fetch("http://localhost:5002/api/CompanyApi/UpdateCompany", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          c_company_id: companyObj.c_company_id,
          c_company_name: formData.companyName,
          c_email: formData.email,
          c_password: companyObj.c_password,
          c_phone: formData.phone,
          c_country: formData.country,
          c_created_at: companyObj.c_created_at,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Update failed");
          return res.json();
        })
        .then((data) => {
          Swal.fire({
            icon: "success",
            title: "Profile Updated Successfully",
            confirmButtonText: "OK",
          });
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Failed to update profile",
            confirmButtonText: "OK",
          });
        });
    }
  };

  const handleDeleteAccount = () => {
    const token = localStorage.getItem('token');
    if (!companyObj) return;
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "Do you really want to delete your account?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:5002/api/CompanyApi/DeleteCompany", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ c_company_id: companyObj.c_company_id }),
        })
          .then((res) => {
            if (!res.ok) throw new Error("Delete failed");
            return res.text();
          })
          .then((msg) => {
            Swal.fire({
              icon: "success",
              title: msg || "Account Deleted",
              confirmButtonText: "OK",
            }).then(() => {
              localStorage.removeItem('token');
              window.location.href = "/company-login";
            });
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Failed to delete account",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-pink-100 via-orange-50 to-yellow-100 text-foreground">
      <div
        className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg"
        data-aos="fade-up"
      >
        <h2 className="text-2xl font-bold mb-6 text-pink-600">Update Company Profile</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300"
            placeholder="Your Company Name"
          />
          {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full px-4 py-2 rounded-md bg-gray-200 border border-gray-300 cursor-not-allowed"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            maxLength={10}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300"
            placeholder="10-digit number"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300"
          >
            <option value="">-- Select Country --</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-pink-600 text-white py-3 rounded-md hover:bg-pink-700 transition"
        >
          Submit
        </button>

        <button
          onClick={handleDeleteAccount}
          className="w-full mt-4 border border-red-600 text-red-600 py-3 rounded-md hover:bg-red-600 hover:text-white transition"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}