export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 px-6 text-center bg-white dark:bg-gray-950">
      {/* Hero Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Pink Glow Top Left */}
        <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] 
          bg-pink-300 dark:bg-purple-800 rounded-full blur-3xl 
          opacity-60 dark:opacity-30 animate-pulse" />

        {/* Blue Glow Top Right */}
        <div className="absolute top-[-100px] right-[-150px] w-[350px] h-[350px] 
          bg-blue-400 dark:bg-blue-700 rounded-full blur-2xl 
          opacity-50 dark:opacity-20 animate-pulse" />

        {/* Yellow/Purple Bottom Glow */}
        <div className="absolute bottom-[-120px] left-1/2 transform -translate-x-1/2 
          w-[700px] h-[400px] bg-gradient-to-tr from-yellow-200 via-purple-300 to-transparent 
          dark:from-blue-900 dark:via-purple-900 dark:to-transparent 
          rounded-full blur-[100px] opacity-70 dark:opacity-40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-blue-600 dark:text-white mb-6 tracking-tight">
          Welcome to TrustVault
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Secure, simple, and fast financial infrastructure for your digital business.
        </p>
        <button className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl">
          Get Started
        </button>
      </div>
    </section>
  );
}
