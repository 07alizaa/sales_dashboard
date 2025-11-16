/**
 * Main Layout Wrapper
 * Contains Navbar + Sidebar + Page Content
 */

import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      {/* using calc to subtract navbar height - learned this CSS trick */}
      <main className="ml-64 mt-16 p-6 min-h-[calc(100vh-4rem)]">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;