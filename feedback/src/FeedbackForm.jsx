import { useState } from 'react';
import './FeedbackForm.css';
import FbMcq from './FBMcq';
import { useNavigate, useParams } from 'react-router-dom';

function FeedbackForm({ pid, otpid }) {
  const [res, setRes] = useState({ res1: '', res2: '', res3: '', res4: '' });
  let params = useParams();
  let navigate = useNavigate();
  
  const onChangeHandler = (resText, qNo) => {
    let { res1, res2, res3, res4 } = res;
    if (qNo === 1) {
      res1 = resText;
    } else if (qNo === 2) {
      res2 = resText;
    } else if (qNo === undefined) {
      res3 = resText.target.value;
    } else if (qNo === 4) {
      res4 = resText;
    }
    setRes({ res1, res2, res3, res4 });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      'res_id': otpid,
      'res1': res.res1,
      'res2': res.res2,
      'res3': res.res3,
      'res4': res.res4,
      // '': pid,
    });
    // call api and render next page
    const response = await fetch('https://ssip-project.herokuapp.com/feedback/form/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 4e2ffb12ab52213e89eb311e2b65f1fcd081698d',
      },
      body: JSON.stringify({
        'res_id': otpid,
        'res1': res.res1,
        'res2': res.res2,
        'res3': res.res3,
        'res4': res.res4,
        // '': pid,
      }),
    });
    const result = await response.json();
    console.log(result);
  };
  const data = [
    {
      qNo: 1,
      question: 'How did you come to the police station?',
      opts: [
        { id: 1, text: 'a. Through a person known to a police officer' },
        { id: 2, text: 'b. With a neighbour/ local leader' },
        { id: 3, text: 'c. On your own' },
      ],
      res: res.res1,
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
      res: res.res2,
    },
    {
      qNo: 3,
      question: 'How would you describe your experience with police officers in the police station? ( ) Maximum 300 characters allowed.',
      opts: [],
      res: res.res3,
    }
  ];
  const mcqs = data.map(({ qNo, question, opts, res }) => 
    <FbMcq
      key={qNo}
      qNo={qNo}
      question={question}
      opts={opts}
      res={res}
      onChangeHandler={onChangeHandler}
    />
  );
  const ratingStyle = "flex-item flex-11 rating-lbl";
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
          <div className="flex-item flex-cont flex-cont-ques">
            <div className="flex-item flex-item-ques">
              <label className="flex flex-ques">
                <span className="flex-item flex-1" style={{ alignSelf: 'flex-start' }}>4. </span>
                <span className="flex-item flex-11">How satisfied are you?</span>
              </label>
            </div>
            <div className="flex-item flex-item-opts" style={{ display: 'flex' }}>
              <div className="flex-item flex-item-opts">
                <div className="flex">
                  <span className="flex-item flex-1">
                    <input
                      className='rating'
                      id="q4-opt1"
                      type="radio"
                      name="ques4"
                      value="1"
                      checked={res.res4 === '1' ? true : false}
                      onChange={() => onChangeHandler('1', 4)}
                    />
                  </span>
                  <label
                    className={res.res4 === '1' ? `${ratingStyle} rating-selected` : ratingStyle}
                    htmlFor="q4-opt1"
                  >1</label>
                </div>
              </div>
              <div className="flex-item flex-item-opts">
                <div className="flex">
                  <span className="flex-item flex-1">
                    <input
                      className='rating'
                      id="q4-opt2"
                      type="radio"
                      name="ques4"
                      value="2"
                      checked={res.res4 === '2' ? true : false}
                      onChange={() => onChangeHandler('2', 4)}
                    />
                  </span>
                  <label
                    className={res.res4 === '2' ? `${ratingStyle} rating-selected` : ratingStyle}
                    htmlFor="q4-opt2"
                  >2</label>
                </div>
              </div>
              <div className="flex-item flex-item-opts">
                <div className="flex">
                  <span className="flex-item flex-1">
                    <input
                      className='rating'
                      id="q4-opt3"
                      type="radio"
                      name="ques4"
                      value="3" 
                      checked={res.res4 === '3' ? true : false}
                      onChange={() => onChangeHandler('3', 4)}
                    />
                  </span>
                  <label
                    className={res.res4 === '3' ? `${ratingStyle} rating-selected` : ratingStyle}
                    htmlFor="q4-opt3"
                  >3</label>
                </div>
              </div>
              <div className="flex-item flex-item-opts">
                <div className="flex">
                  <span className="flex-item flex-1">
                    <input
                      className='rating'
                      id="q4-opt4"
                      type="radio"
                      name="ques4"
                      value="4"
                      checked={res.res4 === '4' ? true : false}
                      onChange={() => onChangeHandler('4', 4)}
                    />
                  </span>
                  <label
                    className={res.res4 === '4' ? `${ratingStyle} rating-selected` : ratingStyle}
                    htmlFor="q4-opt4"
                  >4</label>
                </div>
              </div>
              <div className="flex-item flex-item-opts">
                <div className="flex">
                  <span className="flex-item flex-1">
                    <input
                      className='rating'
                      id="q4-opt5"
                      type="radio"
                      name="ques4"
                      value="5"
                      checked={res.res4 === '5' ? true : false}
                      onChange={() => onChangeHandler('5', 4)}
                    />
                  </span>
                  <label
                    className={res.res4 === '5' ? `${ratingStyle} rating-selected` : ratingStyle}
                    htmlFor="q4-opt5"
                  >5</label>
                </div>
              </div>
            </div>
          </div>
          <button
            className="flex-item flex-cont flex-cont-ques btn-submit"
            onClick={handleSubmit}
          >Submit</button>
        </div>
      </form>
    </div>
  );
}

export default FeedbackForm;
