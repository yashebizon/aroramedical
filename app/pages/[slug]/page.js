import { getPages } from '../../../lib/woredpressApi'
import { getPageBySlug } from '../../../lib/woredpressApi'
export async function generateStaticParams() {
  try {
    const res = await getPages();
   
    
    return res.map((page) => ({
      slug: page.slug,
    }));
  } catch (error) {
    return []; // Return an empty array if there's an error
  }
}

export default async function Page({ params }) {
  const page = await getPageBySlug(params.slug);

  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <div>
      <h1>{page.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    </div>
  );
}
