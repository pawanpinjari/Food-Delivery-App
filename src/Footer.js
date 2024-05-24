import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import './footer.css';


const Footer = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, form.current, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
      .then((result) => {
          alert("Success");
      }, (error) => {
          alert("Wrong Details");
      });
  };

  return (
    <>
      <section className="contact" id="contact">
        <div className="max-width">

          <div className="contact-content">
            <div className="column left">
              <div className="text">Get in Touch</div>
              <div className="icons">
                <div className="row">
                  <div>

                    <i className="fas fa-user"></i>
                  </div>
                  <div className="info">
                    <div className="head">Name</div>
                    <div className="sub-title">Pawan Pinjari</div>
                  </div>
                </div>
                <div className="row">
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="info">
                    <div className="head">Address</div>
                    <div className="sub-title">Pune, India</div>
                  </div>
                </div>
                <div className="row">
                  <i className="fas fa-phone-square-alt"></i>
                  <div className="info">
                    <div className="head">Mobile No</div>
                    <div className="sub-title">+91 7066651454</div>
                  </div>
                </div>
                <div className="row">
                  <i className="fas fa-envelope"></i>
                  <div className="info">
                    <div className="head">Email</div>
                    <a className="sub-title" href="mailto:pawanpinjari21@gmail.com">pawanpinjari21@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="column right">
              <div className="text">Message me</div>
              <p>Questions,Bug Reports,Feedback - Send Here</p>
              <form ref={form} onSubmit={sendEmail}>
                <div className="fields">
                  <div className="field name">
                    <input type="text" name="name" id="name" placeholder="Name" required />
                  </div>
                  <div className="field email">
                    <input type="email" id="email" placeholder="Email" required />
                  </div>
                </div>
                <div className="fields">
                  <div className="field mobile">
                    <input type="text" name="mobile" id="mobile" placeholder="Mobile No." required />
                  </div>
                  <div className="field subject">
                    <input type="text" name="subject" id="subject" placeholder="Subject" />
                  </div>
                </div>
                <div className="field textarea">
                  <textarea cols="30" rows="10" name="message" id="message" placeholder="Message.." required></textarea>
                </div>
                <div className="button-area">
                  <button type="submit">Send message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div>
          <h3 className="text">Follow us:</h3>
          <span>
            <a href="https://www.linkedin.com/in/pawanpinjari/">
              <span className="social-icon">

                <i className="fab fa-linkedin"></i>
              </span>
            </a>
            <a href="https://github.com/pawanpinjari">
              <span className="social-icon">

                <i className="fab fa-github"></i>
              </span>
            </a>
            <a href="https://twitter.com/pawan_pinjari">
              <span className="social-icon">

                <i className="fab fa-twitter"></i>
              </span>
            </a>
            <a href="https://www.instagram.com/pawan_pinjari_96k_/">
              <span className="social-icon">

                <i className="fab fa-instagram"></i>
              </span>

            </a>
          </span>
        </div>
        <span>Created By Pawan Pinjari | <span className="far fa-copyright"></span> 2024 All rights reserved.</span>
      </footer>

    </>
  );
};
export default Footer
