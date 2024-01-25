import type { Metadata } from 'next';
import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from "@clerk/themes";
import { Inter } from 'next/font/google';
import './globals.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
config.autoAddCss = false; // Disable the automatic CSS injection

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sglid',
  description: 'The Discord Bot Sglid can search for Scratch users and projects, link Scratch accounts with Discord accounts, and also perform server management tasks.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`dark bg-background ${inter.className}`}>
      <ClerkProvider appearance={{baseTheme: dark}}>
        {children}
      </ClerkProvider>
    </html>
  )
}
