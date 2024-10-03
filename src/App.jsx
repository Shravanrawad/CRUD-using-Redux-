import React from "react"
import Navbar from "./componants/navbar"
import Form from "./componants/form"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Read from "./componants/read"
import Edit from "./componants/edit"

function App() {
  return (
    <div>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form/>}/>
          <Route path="/read" element={<Read/>}/>
          <Route path="/edit/:id" element={<Edit/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
