import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'افغان بازار | Afghan Bazar', description: 'بازار آنلاین خرید و فروش افغانستان' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="fa" dir="rtl"><body>{children}</body></html>; }
