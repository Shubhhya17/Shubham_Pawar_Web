"use client";

export default function Contact() {
  return (
    <section className="contact" id="contact">

      <div className="max-width">

        <h2 className="title">Contact me</h2>

        <div className="contact-content">

          {/* LEFT SIDE */}

          <div className="column left">

            <div className="text">Get in Touch</div>

            <p>
              As a software engineering student, I am actively seeking
              opportunities to apply my skills and contribute to projects.
              I am eager to gain hands-on experience and make meaningful
              contributions in the field.
            </p>

            <div className="icons">

              {/* Name */}

              <div className="row">
                <i className="fas fa-user"></i>

                <div className="info">
                  <div className="head">Name</div>
                  <div className="sub-title">Shubham Pawar</div>
                </div>
              </div>


              {/* Address */}

              <div className="row">
                <i className="fas fa-map-marker-alt"></i>

                <div className="info">
                  <div className="head">Address</div>
                  <div className="sub-title">Maharashtra, India</div>
                </div>
              </div>


              {/* Email */}

              <div className="row">
                <i className="fas fa-envelope"></i>

                <div className="info">
                  <div className="head">Email</div>
                  <div className="sub-title">
                    shubhpawar1703@gmail.com
                  </div>
                </div>
              </div>

            </div>

          </div>


          {/* RIGHT SIDE FORM */}

          <div className="column right">

            <div className="text">Message me</div>

            <form
              action="https://formspree.io/f/xvzplypo"
              method="POST"
            >

              <div className="fields">

                <div className="field name">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                  />
                </div>

                <div className="field email">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </div>

              </div>


              <div className="field subject">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                />
              </div>


              <div className="field textarea">
                <textarea
                  name="message"
                  placeholder="Message.."
                  required
                ></textarea>
              </div>


              <div className="button-area">
                <button
                  type="submit"
                  className="submit-btn"
                >
                  Send Message
                </button>
              </div>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}