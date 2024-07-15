// app/layout.tsx
import { ReactNode } from 'react';
import './globals.css';
import ClientProvider from '@/components/ClientProvider';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
