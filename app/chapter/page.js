'use client'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const CultureLensApp = dynamic(() => import('@/components/CultureLensApp'), { ssr: false })

export default function ChapterPage() {
  return (
    <Suspense fallback={
      <div style={{minHeight:'100vh',background:'#FEFCE8',display:'flex',alignItems:'center',justifyContent:'center',color:'#94A3B8',fontFamily:"'Nunito',sans-serif",fontSize:16}}>
        Loading CultureLens...
      </div>
    }>
      <CultureLensApp />
    </Suspense>
  )
}
