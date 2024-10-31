import Link from 'next/link';
import { getPages } from '../../lib/woredpressApi'
export const revalidate = 10; // Revalidate the data at most every 10 seconds



export default async function PageList() {
  const pages = await getPages();

  return (
    <div>
      <h1>WordPress Pages</h1>
      <ul>
        {Array.isArray(pages) && pages.map((page) => (
          <li key={page.id}>
            <Link href={`/pages/${page.slug}`}>
              {page.title.rendered}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
