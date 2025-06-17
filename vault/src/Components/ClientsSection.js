export default function ClientSection() {
  return (
    <section className="px-6 py-16 bg-white dark:bg-gray-900 text-center">
      <h2
        className="text-3xl font-bold text-gray-800 dark:text-white mb-12"
        data-aos="fade-up"
      >
        Trusted by leading companies
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
        {[
          "/Images/Client1.png",
          "/Images/Client2.png",
          "/Images/Client3.png",
          "/Images/Client4.png",
        ].map((src, index) => (
          <div
            key={index}
            className="flex items-center justify-center h-32 w-full bg-gray-100 dark:bg-white/10 rounded-xl shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-500"
            data-aos="flip-up"
            data-aos-delay={index * 200}
          >
            <img
              src={src}
              alt={`Client ${index + 1}`}
              className="max-h-20 object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
