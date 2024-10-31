import React, { useState } from 'react';
import { useRouter } from "next/navigation";

type Props = {}

const SearchButton = (props: Props) => {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    if (searchText.trim()) {
      router.push(`/blogs?search=${encodeURIComponent(searchText)}`);
    }
  };

  const handleSearchButtonClick = () => {
    setShowSearch(true);
  };

  const handleCloseSearchForm = () =>{
    setTimeout(() => {
        setShowSearch(false)
      }, 1000);
  }

  const handleCloseSearch = () => {
    setShowSearch(false);
  };

  return (
    <div className="relative">
      {/* Search Button */}
      <button
        className="text-[#2c2c2c]"
        onClick={handleSearchButtonClick}
        aria-expanded={showSearch}
      >
        <img src="/images/search-icons.png" alt="Search" className='hidden lg:flex' />
        <svg width="16" className='flex lg:hidden' height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_2661_5826)">
<path d="M6.35187 11.3268C9.21557 11.3268 11.5371 9.00528 11.5371 6.14158C11.5371 3.27788 9.21557 0.95639 6.35187 0.95639C3.48817 0.95639 1.16669 3.27788 1.16669 6.14158C1.16669 9.00528 3.48817 11.3268 6.35187 11.3268Z" stroke="#079561" strokeWidth="2" strokeLinecap="square"/>
<path d="M12.8333 12.6231L10.0139 9.80362" stroke="#079561" strokeWidth="2" strokeLinecap="square"/>
</g>
<defs>
<clipPath id="clip0_2661_5826">
<rect width="14" height="14" fill="white"/>
</clipPath>
</defs>
</svg>


      </button>

      {/* Search Form with Transition */}
      {showSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-[2px] z-50 flex items-center justify-center px-10">
          <div
            className={`relative w-full max-w-lg p-8 bg-white shadow-lg rounded-lg transform transition-all duration-300 ${
              showSearch ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={handleCloseSearch}
            >
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 21L21 3" stroke="#079561" strokeWidth="2" strokeLinecap="square"/>
<path d="M21 21L3 3" stroke="#079561" strokeWidth="2" strokeLinecap="square"/>
</svg>

            </button>
            <h2 className="text-2xl font-semibold text-center mb-4">Search Blogs</h2>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="search blogs..."
                className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:ring focus:ring-[#079561] focus:border-[#079561] outline-none"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
              
                type="submit"
                className="w-full mt-4 font-bold bg-[#079561] text-white py-2 px-4 rounded-md hover:bg-[#066c49] transition duration-300"
                onClick={handleCloseSearchForm}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchButton;
