import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-black dark:bg-dark-bg dark:text-dark-text py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div>
            <h3 className="text-lg font-semibold dark:text-dark-title text-light-filters">Owltlet</h3>
            <p className="mt-2 text-sm text-white">
              Innovation and technology meet here. Explore our selection of next-generation devices.
            </p>
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold dark:text-dark-title text-light-filters">Quick links</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <span className="hover:underline text-white">
                  Franchises
                </span>
              </li>
              <li>
                <span className="hover:underline text-white">
                  About Us
                </span>
              </li>
              <li>
                <span className="hover:underline text-white">
                  Contact
                </span>
              </li>
              <li>
                <span className="hover:underline text-white">
                  Privacy Policy
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold dark:text-dark-title text-light-filters">Follow Us</h3>
            <ul className="mt-2 flex space-x-4">
              <li>
                <Facebook className="text-white hover:text-yellow-500 cursor-pointer"/>
              </li>
              <li>
                <Twitter className="text-white hover:text-yellow-500 cursor-pointer"/>
              </li>
              <li>
                <Instagram className="text-white hover:text-yellow-500 cursor-pointer"/>
              </li>
              <li>
                <Linkedin className="text-white hover:text-yellow-500 cursor-pointer"/>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-muted-foreground dark:border-dark-muted pt-4 text-sm text-center text-white">
          <p>&copy; {new Date().getFullYear()} Owltlet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
