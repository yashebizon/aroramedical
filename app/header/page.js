"use client";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [menuData, setMenuData] = useState(null);
  const menuId = 94; // Replace with your actual menu ID

  useEffect(() => {
    fetch(`https://aroramedical.ebizonstaging.com/wp-json/wp/v2/menu/${menuId}`)
      .then((response) => response.json())
      .then((data) => setMenuData(data))
      .catch((error) => console.error("Error fetching menu data:", error));
  }, [menuId]);

  if (!menuData) {
    return <div>Loading...</div>;
  }

  return (
    <header className="flex items-center justify-between p-4 bg-gray-100">
      <div className="logo">
        {menuData.logo_url ? (
          <img src={menuData.logo_url} alt="Logo" className="h-10" />
        ) : (
          <span className="text-xl font-bold">Logo</span>
        )}
      </div>
      <nav>
        <ul className="flex space-x-4">
          {menuData.items.map((item) => (
            <li key={item.id} className=" group">
              <a
                href={item.url}
                className="text-gray-800"
                dangerouslySetInnerHTML={{ __html: item.title }}
              />
              {item.items && (
                <ul className="absolute left-0 hidden mt-2 space-y-2 bg-white shadow-lg group-hover:block">
                  {item.items.map((subItem) => (
                    <li key={subItem.id}>
                      <a
                        href={subItem.url}
                        className="block px-4 py-2 text-gray-800"
                        dangerouslySetInnerHTML={{ __html: subItem.title }}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div className="flex space-x-4">
          <a href={menuData.my_account_url} className="text-gray-800">
            My Account
          </a>
          <a href={menuData.cart_url} className="text-gray-800">
            Cart 45
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
