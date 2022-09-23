// import { useState } from 'react';
import './FeedbackForm.css';
import FbMcq from './FBMcq';

function FeedbackForm() {
  const data = [
    {
      qNo: 1,
      question: 'How did you come to the police station?',
      opts: [
        { id: 1, text: 'a. Through a person known to a police officer' },
        { id: 2, text: 'b. With a neighbour/ local leader' },
        { id: 3, text: 'c. On your own' },
      ],
    },
    {
      qNo: 2,
      question: 'After how much time you were heard in PS',
      opts: [
        { id: 1, text: 'a. More than 15 minutes' },
        { id: 2, text: 'b. 15 minutes' },
        { id: 3, text: 'c. 10 minutes' },
        { id: 4, text: 'd. 5 minutes' },
        { id: 5, text: 'e. Immediately' },
      ],
    },
    // {
    //   qNo: 3,
    //   question: 'How would you describe your experience with police officers in the police station? ( ) Maximum 300 characters allowed.',
    //   opts: [],
    // }
  ];
  const mcqs = data.map(({ qNo, question, opts }) => 
    <FbMcq
      key={qNo}
      qNo={qNo}
      question={question}
      opts={opts}
    />
  );
  return (
    <div className="feedbackForm">
      <div className="fb-form-header">
        <h1 className="fb-heading">FeedBack</h1>
        <div className="fb-cmb-sty">
          <select name="city" className="fb-cmb">
            <option value="Maninagar">Maninagar</option>
            <option value="Ahmedabad">Ahmedabad</option>
          </select>
        </div>
      </div>
      <form action="" method="">
        <div className="flex-cont" style={{ alignItems: 'stretch' }}>
          {mcqs}
          {/* <div className="flex-item flex-cont flex-cont-ques">
            <div className="flex-item flex-item-ques">
              <label className="flex flex-ques">
                <span className="flex-item flex-1">1. </span>
                <span className="flex-item flex-11">How did you come to the police station?</span>
              </label>
            </div>
            <div className="flex-item flex-item-opts">
              <div className="flex">
                <span className="flex-item flex-1">
                  <input id="q1-opt1" type="radio" name="ques1" value="a" />
                </span>
                <span className="flex-item flex-11">
                  <label htmlFor="q1-opt1">a. Through a person known to a police officer</label>
                </span>
              </div>
            </div>
            <div className="flex-item flex-item-opts">
              <div className="flex">
                <span className="flex-item flex-1">
                  <input id="q1-opt2" type="radio" name="ques1" value="b" />
                </span>
                <span className="flex-item flex-11">
                  <label htmlFor="q1-opt2">b. With a neighbour/ local leader</label>
                </span>
              </div>
            </div>
            <div className="flex-item flex-item-opts">
              <div className="flex">
                <span className="flex-item flex-1">
                  <input id="q1-opt3" type="radio" name="ques1" value="c" />
                </span>
                <span className="flex-item flex-11">
                  <label htmlFor="q1-opt3">c. On your own</label>
                </span>
              </div>
            </div>
          </div> */}
          {/* <FbMcq
            qNo={1}
            question={'How did you come to the police station?'}
            opts={opts1}
          /> */}
          {/* <div className="flex-item flex-cont flex-cont-ques">
            <div className="flex-item flex-item-ques">
              <label className="flex flex-ques">
                <span className="flex-item flex-1">2. </span>
                <span className="flex-item flex-11">After how much time you were heard in PS</span>
              </label>
            </div>
            <div className="flex-item flex-item-opts">
              <div className="flex">
                <span className="flex-item flex-1">
                  <input id="q2-opt1" type="radio" name="ques2" value="a" />
                </span>
                <span className="flex-item flex-11">
                  <label htmlFor="q2-opt1">a. More than 15 minutes</label>
                </span>
              </div>
            </div>
            <div className="flex-item flex-item-opts">
              <div className="flex">
                <span className="flex-item flex-1">
                  <input id="q2-opt2" type="radio" name="ques2" value="b" />
                </span>
                <span className="flex-item flex-11">
                  <label htmlFor="q2-opt2">b. 15 minutes</label>
                </span>
              </div>
            </div>
            <div className="flex-item flex-item-opts">
              <div className="flex">
                <span className="flex-item flex-1">
                  <input id="q2-opt3" type="radio" name="ques2" value="c" />
                </span>
                <span className="flex-item flex-11">
                  <label htmlFor="q2-opt3">c. 10 minutes</label>
                </span>
              </div>
            </div>
            <div className="flex-item flex-item-opts">
              <div className="flex">
                <span className="flex-item flex-1">
                  <input id="q2-opt4" type="radio" name="ques2" value="d" />
                </span>
                <span className="flex-item flex-11">
                  <label htmlFor="q2-opt4">d. 5 minutes</label>
                </span>
              </div>
            </div>
            <div className="flex-item flex-item-opts">
              <div className="flex">
                <span className="flex-item flex-1">
                  <input id="q2-opt5" type="radio" name="ques2" value="d" />
                </span>
                <span className="flex-item flex-11">
                  <label htmlFor="q2-opt5">e. Immediately</label>
                </span>
              </div>
            </div>
          </div> */}
        </div>
      </form>
    </div>
  );
}

export default FeedbackForm;
