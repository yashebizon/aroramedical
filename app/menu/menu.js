// pages/_app.js

import { useEffect, useState } from 'react';
import { fetchWordPressMenu } from '../utils/wordpress';

function MyApp({ Component, pageProps }) {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const items = await fetchWordPressMenu('primary'); // Replace 'primary' with your menu location
      setMenuItems(items);
    };

    fetchMenu();
  }, []);

  return <Component {...pageProps} menuItems={menuItems} />;
}

export default MyApp;
