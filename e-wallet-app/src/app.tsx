import { useState } from 'preact/hooks'
export function App() {

  return (
    <div class="p-4 max-w-lg  mx-auto ">
      <div class="flex">
        <div class="w-14 bg-blue-400 rounded-full h-14"></div>
        <div class="">Available on Phone</div>
      </div>
      <div className="flex justify-between">
        <div class="w-14 bg-blue-400 rounded-full h-14"></div>
        <div class="w-14 bg-blue-400 rounded-full h-14"></div>
        <div class="w-14 bg-blue-400 rounded-full h-14"></div>
        <div class="w-14 bg-blue-400 rounded-full h-14"></div>
        <div class="w-14 bg-blue-400 rounded-full h-14"></div>
      </div>

    </div>
  )
}
