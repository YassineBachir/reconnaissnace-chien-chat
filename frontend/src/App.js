// 
import React from 'react'
import FileUpload from './components/FileUpload'



export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
        
        <FileUpload />
      </div>
    </div>
  )
}
