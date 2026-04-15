'use client'
import { useState, Suspense } from 'react'
import dynamic from 'next/dynamic'

const CultureLensApp = dynamic(() => import('@/components/CultureLensApp'), { ssr: false })

export default function ChapterPage() {
  return (
    <Suspense fallback={
      <div style={{minHeight:'100vh',background:'#08090C',display:'flex',alignItems:'center',justifyContent:'center',color:'#706F73',fontFamily:"'Outfit',sans-serif"}}>
        Loading CultureLens...
      </div>
    }>
      <CultureLensApp />
    </Suspense>
  )
}
