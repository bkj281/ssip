import './FbMcq.css';
import FbMcqOpt from './FbMcqOpt';

function FbMcq({ qNo, question, opts, res, onChangeHandler }) {
  let fbMcqOpts;
  if (opts.length > 0) {
    fbMcqOpts = opts.map((opt) => <FbMcqOpt key={opt.id} qNo={qNo} optNo={opt.id} option={opt.text} res={res} onChangeHandler={onChangeHandler} />);
  } else {
    fbMcqOpts = (
      <div className="flex-item flex-item-opts" style={{ alignSelf: 'stretch' }}>
            <textarea
              className="txtarea"
              id={`q${qNo}-txtarea`}
              name={`ques${qNo}`}
              placeholder="Click to enter"
              rows="3"
              cols="25"
              maxLength={300}
              onChange={onChangeHandler}
              value={res}
            ></textarea>
      </div>
    );
  }
  return (
    <>
      <div className="flex-item flex-cont flex-cont-ques">
        <div className="flex-item flex-item-ques">
          <label className="flex flex-ques">
            <span className="flex-item flex-1" style={{ alignSelf: 'flex-start' }}>{qNo}. </span>
            <span className="flex-item flex-11">{question}</span>
          </label>
        </div>
        {fbMcqOpts}
      </div>
    </>
  );
}

export default FbMcq;
