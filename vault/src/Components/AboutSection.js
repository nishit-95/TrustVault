import React from "react";

export default function AboutSection() {
  return (
    <section
      className="px-6 py-20 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Top Strip */}
        <div
          className="w-full h-2 bg-blue-500 mb-6 rounded-lg"
          data-aos="slide-right"
          data-aos-delay="100"
        ></div>

        <h2
          className="text-4xl font-bold text-gray-800 dark:text-white mb-4"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          About TrustVault
        </h2>

        <p
          className="text-lg text-gray-600 dark:text-gray-300 mb-10"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          TrustVault is your all-in-one financial security platform. We combine industry-grade encryption
          with next-gen usability to help businesses grow securely, efficiently, and confidently.
        </p>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-6">
          <div
            className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl"
            data-aos="zoom-in"
            data-aos-delay="500"
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Secure Infrastructure</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Built with the highest security standards to protect your data.
            </p>
          </div>

          <div
            className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl"
            data-aos="zoom-in"
            data-aos-delay="700"
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Simple Integration</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Fast, flexible APIs that plug into your existing workflows.
            </p>
          </div>

          <div
            className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl"
            data-aos="zoom-in"
            data-aos-delay="900"
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Lightning Speed</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get results fast with real-time updates and blazing-fast sync.
            </p>
          </div>
        </div>

        {/* Bottom Strip */}
        <div
          className="w-full h-2 bg-blue-500 mt-10 rounded-lg"
          data-aos="slide-left"
          data-aos-delay="1100"
        ></div>
      </div>
    </section>
  );
}
