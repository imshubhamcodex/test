import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Footersection from '../shared/Footer'


export default function Home() {
  return (
    <div>
      <section className="breadcrumb section-1">
        <div className="container">
          <div className="col-md-12">
          <ul className="list-inline">
            <li className="list-inline-item">Home</li>
          </ul>
          </div>
        </div>
      </section>

      <section className="banner section-2 bg-light">
        <div className="container">
          <div className="row">
            <div className='search-text col-sm-5 card-body bg-light'>
              <h1>SimplyOpen <br/> Prepare For Certifications!</h1>
              <p>Study for Professional Exams and IT certifications on Web and Mobile with our Exam Simulator. We provide updated content for all our exams so that you are preparing with latest learning material.</p>
              <br/>
              <p>Preparation made easy with Accurate & Update Questions.</p>
              <h3>Search coming soon. Please use categories to find your exam.</h3>
              <div className="search-box">
                <input type='text' className='form-control' placeholder="Search text" />
                <FontAwesomeIcon icon={faSearch} />
                </div>
            </div>
            <div className="banner-img col-sm-7">
              <img className="img-responsive" src="images/learning.jpg" />
            </div>
          </div>
        </div>
      </section>

      <section className="banner section-2 mt-4">
        <div className="d-flex justify-content-center">
         
            <div className="col-md-6 card-body bg-light">
              <h2>What is SimplyOpen?</h2>
                <p>In SimplyOpen we provide web and mobile compatible Exam Simulator where one can prepare for major Professional Exams and IT Certifications. Our Site is completely free for one to practice all exams replicating real-world scenarios. Our Content is always up-to-date and we make sure that we bring you the latest and best study materials. One can also request for a specific exam if it’s missing from our collection.
                </p>
            </div>
            <div className="col-md-6 card-body bg-light ml-4">
            <h2>What SimplyOpen has to offer.</h2>
                <p>We have a huge collection of Professional exams and IT certification which includes exams from well-known vendors like Microsoft, MCSE, MCDBA, MCSD, A+, Network+, Security+, CCNA, CCNP, Amazon, Google, CompTIA, Cloudera and so on. We don’t provide any restriction on how much one can study either in no of attempts or no of exams. You can replicate real-world scenarios by selecting no of questions and time in which you want to prepare.
                </p>
            </div>
        </div>
      </section>
      
      <h2>Most Famous Vendors..</h2>
      <div className="row">
          <div className="col-md-3">
            <h3>CompTIA</h3>
            <p>CompTIA is a global provider of vendor neutral IT certifications, such as the popular A+, Network+, Security+ certifications. Most, if not all, CompTIA certifications are entry-level attracting students and those new to the IT field. </p>
            <p><a className="btn btn-secondary" href="/category_details/CompTIA==3" role="button">View details »</a></p>
          </div>
          <div className="col-md-3">
            <h3>Amazon</h3>
            <p>AWS Certification validates cloud expertise to help professionals highlight in-demand skills and organizations build effective, innovative teams for cloud initiatives using AWS.</p>
            <p><a className="btn btn-secondary" href="/category_details/Amazon%20Web%20Services%20-%20AWS==1" role="button">View details »</a></p>
          </div>
          <div className="col-md-3">
            <h3>Microsoft</h3>
            <p>The Microsoft certification program prepares employees and prospective employees for success in using Microsoft products, such as Office, and related software skills, such coding and database administration. </p>
            <p><a className="btn btn-secondary" href="/category_details/Microsoft==9" role="button">View details »</a></p>
          </div>
          <div className="col-md-3">
            <h3>ECCouncil</h3>
            <p>The International Council of E-Commerce Consultants (EC-Council) is a member-based organization that certifies individuals in various e-business and information security skills. </p>
            <p><a className="btn btn-secondary" href="/category_details/ECCouncil==5" role="button">View details »</a></p>
          </div>
        </div>
      <Footersection/>
    </div>

  )
}
