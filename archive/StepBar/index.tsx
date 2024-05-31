import "./StepBar.css";
import React, { ReactNode, useState } from "react";

type StepBarProps = {
  // changeStepHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode[];
};

const StepBar = ({ children }: StepBarProps) => {
  // const stages = ["HTML", "DOM", "CSS", `PARSE`];
  const [stage, setStage] = useState<number>(0);
  // console.log(children[0].props.name);

  const changeStageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setStage(event.target.value);
    // console.log(event.target.value);
  };

  return (
    <div className="stages-container">
      <div className="stage-select-container">
        <form className="stage-select">
          {children.map((stage, index) => (
            <div className="stage-container" key={index}>
              <input
                className="stage-radio"
                id={`stage-radio-${index}`}
                type="radio"
                name={`stage-radio`}
                value={index}
                onChange={changeStageHandler}
                defaultChecked={index === 0}
              />
              <label
                htmlFor={`stage-radio-${index}`}
                className="stage-radio-label"
              >
                <div className="stage-number">{index + 1}</div>
                <div className="stage-title">{"stage name"}</div>
              </label>
            </div>
          ))}
        </form>
      </div>
      <div className="displayed-stage">{children[stage]}</div>
    </div>
  );
};

export default StepBar;
