import React from "react";

const MyFooter = () => (
    <footer style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }} className='text-center text-lg-start text-muted'>
      <section className='border-bottom'>
        <div className='container text-center text-md-start mt-5'>
        &nbsp;
        </div>
      </section>

      <div className='text-center p-4 bg-dark text-white' >
        © 2023 Copyright: 
        <a className='text-reset fw-bold text-white' href='https://github.com/ianmartinezrey'>
          Ian Sebastian Martinez Rey
        </a>
      </div>
    </footer>
);

export default MyFooter;