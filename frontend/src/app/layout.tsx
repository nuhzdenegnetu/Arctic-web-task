import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Snippet Vault - Save Your Code Snippets',
  description: 'A simple service for storing useful snippets with tags and search',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

