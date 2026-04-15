import './globals.css'

export const metadata = {
  title: 'CultureLens | Culture Articulation Platform',
  description: 'Express your organisational culture. See it take shape. Make it yours.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
