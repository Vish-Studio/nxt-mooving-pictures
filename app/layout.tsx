import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../src/index.css';
import { Layout } from '../src/components/layout/layout';

export const metadata: Metadata = {
  title: 'Mooving Pictures',
  description: 'A creative studio specializing in motion and digital experiences.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
