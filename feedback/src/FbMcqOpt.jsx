import './FbMcqOpt.css'

function FbMcqOpt({ qNo, optNo, option, res, onChangeHandler }) {
  return (
    <>
      <div className="flex-item flex-item-opts">
        <div className="flex">
          <span className="flex-item flex-1">
            <input
              id={`q${qNo}-opt${optNo}`}
              type="radio"
              name={`ques${qNo}`}
              value={option}
              checked={res === option ? true : false}
              onChange={() => onChangeHandler(option, qNo)}
            />
          </span>
          <span className="flex-item flex-11">
            <label htmlFor={`q${qNo}-opt${optNo}`}>{option}</label>
          </span>
        </div>
      </div>
    </>
  );
}

export default FbMcqOpt;
