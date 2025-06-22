import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand and Social */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">TrustVault</h2>
          <p className="mb-4 text-sm">
            Secure your digital finance with the trust you deserve.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-600 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-600 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">Documentation</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">Support</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
          <p className="text-sm mb-4">Get the latest updates, news, and offers.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-l-md focus:outline-none bg-white dark:bg-gray-800 border dark:border-gray-700"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition">
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Bottom line */}
      <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-6 text-center text-sm">
        &copy; {new Date().getFullYear()} TrustVault. All rights reserved.
      </div>
    </footer>
  );
}
