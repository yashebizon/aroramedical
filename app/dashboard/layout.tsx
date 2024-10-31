import { Suspense } from 'react'
export default function dashLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <section>
         <Suspense fallback={<p>Loading feed...</p>}></Suspense>
        {children}
      </section>
    );
  }