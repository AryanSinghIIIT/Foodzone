import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top ">
    <div className="col-md-4 d-flex align-items-center">
      <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
      </Link>
      <span className=" ms-50 fs-1 text-dark">© 2023 GoFood, Inc</span>
      <span className='m-1 bg-dark '><Link to="https://www.linkedin.com/in/aryan-singh-b01832193/">About me</Link></span>
    </div>

   
    
  </footer>

    </div>
  )
}
