import './globals.css';

export const metadata = {
  title: 'AI Resume Matcher',
  description: 'Match your resume to any job description using AI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}