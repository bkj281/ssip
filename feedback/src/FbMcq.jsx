import './FbMcq.css';
import FbMcqOpt from './FbMcqOpt';

function FbMcq({ qNo, question, opts }) {
  const fbMcqOpts = opts.map((opt) => <FbMcqOpt key={opt.id} qNo={qNo} optNo={opt.id} option={opt.text} />);
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
