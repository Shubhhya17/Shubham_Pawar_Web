"use client";

export default function Education() {
  return (
    <section className="skills" id="education">
      <div className="max-width">

        <h2 className="title">Education</h2>

        <div className="skills-content">

          {/* 10th Standard */}
          {/* <div className="column right">

            <center>
              <h1>10 Standard</h1>
            </center>

            <p>
              I have completed my SSC from Shri Gurudev Vidya Mandir
              Gurukunj Ashram in Mozari, securing 75.40%.
              I stood fifth in the school rankings.

              My subjects included Marathi, Hindi, English,
              Mathematics, Science & Technology and Social Science.
            </p>

            <hr/>

          </div> */}


          {/* BE */}
          <div className="column right">

            <center>
              <h1>BE (CSE)</h1>
            </center>

            <p>
              Currently pursuing Bachelor of Engineering at
              Dr. Rajendra Gode Institute of Technology and Research,
              Amravati with a CGPA of 9.07.

              Consistently clearing all semesters without backlogs
              and achieving the third position in the sixth semester.
            </p>

            <hr/>

          </div>


          {/* 12th */}
          {/* <div className="column right">

            <center>
              <h1>12 Standard</h1>
            </center>

            <p>
              I have completed my Higher Secondary Certificate
              from Matoshri Kamalabai Thamke Junior College in
              Gokunda securing 57 marks.

              Subjects included English, Hindi, Mathematics,
              Physics, Chemistry and Biology.
            </p>

            <hr/>

          </div> */}


          {/* Progress Bars */}

          <div className="column right">

            {/* 10th */}
            {/* <div className="bars">
              <div className="info">
                <span>10th</span>
                <span>75%</span>
              </div>

              <div className="line mysql"></div>
            </div> */}


            {/* 12th */}
            {/* <div className="bars">
              <div className="info">
                <span>12th</span>
                <span>57%</span>
              </div>

              <div className="line css"></div>
            </div> */}


            {/* BE */}
            <div className="bars">
              <div className="info">
                <span>BE</span>
                <span>80%</span>
              </div>

              <div className="line html"></div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}