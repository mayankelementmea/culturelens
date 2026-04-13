'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'
import Chapter1 from '@/components/Chapter1'

function ChapterContent() {
  const params = useSearchParams()
  const token = params.get('token') || 'demo'
  const handleComplete = (result) => {
    if (result.next_chapter) {
      alert(`Chapter 1 complete! ${result.chapters_completed}/6 done.`)
    }
  }
  return <Chapter1 token={token} onComplete={handleComplete} />
}

export default function ChapterPage() {
  return (
    <Suspense fallback={<div style={{background:'#000',color:'#fff',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading...</div>}>
      <ChapterContent />
    </Suspense>
  )
}
