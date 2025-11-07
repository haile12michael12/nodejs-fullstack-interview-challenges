import '../styles/globals.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 text-white font-bold text-xl">
                File Upload
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/">
                    <span className={`px-3 py-2 rounded-md text-sm font-medium ${
                      router.pathname === '/' 
                        ? 'bg-gray-900 text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}>
                      Upload
                    </span>
                  </Link>
                  <Link href="/files">
                    <span className={`px-3 py-2 rounded-md text-sm font-medium ${
                      router.pathname === '/files' 
                        ? 'bg-gray-900 text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}>
                      Files
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;