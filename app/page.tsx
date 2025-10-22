import React from 'react'
import Link from 'next/link'
const page = () => {
  return (
    <div> 
      <h1>Welcome to Task Manager</h1>
      <Link href={''}>See All Tasks</Link>
    </div>
  )
}

export default page