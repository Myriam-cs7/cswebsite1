import type React from "react"
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"

const FooterBlock: React.FC = () => {
  const socialLinks = {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
  }

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaFacebook size={24} />
          </a>
          <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaInstagram size={24} />
          </a>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaLinkedin size={24} />
          </a>
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FaGithub size={24} />
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default FooterBlock
