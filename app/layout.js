import './globals.css'

export const metadata = {
  title: 'CultureLens | Organisational Culture Intelligence Platform',
  description: 'Enterprise culture diagnostic by element. Seven-layer organisational analysis. AI-powered insights. Board-ready deliverables.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
