import React from 'react'
import { Link } from 'react-router-dom'

export const Error = () => {
  return (
    



      <>  
    <div class="breadcrumb-area">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="breadcrumb-inner">
                    <h2 class="page-title">error</h2>
                    <ul class="page-list">
                        <li class="list-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li class="list-item">
                            <a href="#">error</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="error-area-wrapper">
    <div class="container">
        <div class="col-lg-12">
            <div class="img-box">
                <img src="assets/img/error/404-image.svg" alt="svg" />
            </div>
            <div class="content">
                <h4 class="title">Sorry!!! Page Not Found</h4>
            </div>
        </div>
    </div>
</div>

</>
  )
}
