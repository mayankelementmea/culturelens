import './globals.css'

export const metadata = {
  title: 'CultureLens | Build Your Culture DNA',
  description: 'A 45-minute gamified culture diagnostic by element. Visual exercises, not surveys. Unlock your personal Culture Profile.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
