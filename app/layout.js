import './globals.css'

export const metadata = {
  title: 'CultureLens | Culture Articulation Platform',
  description: 'Express your organisational culture. See it take shape. Make it yours.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="mesh-bg" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        {children}
      </body>
    </html>
  )
}
