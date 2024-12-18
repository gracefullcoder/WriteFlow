import { Link } from 'react-router-dom'

function Navbar() {
    return (
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="/blog" className="text-white font-bold text-xl">
                WriteFlow
              </a>
            </div>
            <div>
              <Link to="/blog/create" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-normal font-medium">
                Create Blog
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }

export default Navbar