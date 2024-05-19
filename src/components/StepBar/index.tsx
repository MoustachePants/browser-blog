import "./StepBar.css";

type StepBarProps = {
  changeStepHandler: (step: string) => {};
};

const StepBar = () => {
  const steps = ["HTML", "DOM", "CSS", `PARSE`];

  return (
    <section className="step-bar-container">
      <form className="step-bar">
        {steps.map((step, index) => (
          <>
            <input
              key={Math.random()}
              className="step-container"
              type="radio"
              name={`step-radio`}
              value={step}
            />
            <label htmlFor={`step-radio`} className="step-radio-label">
              <div className="step-number">{index}</div>
              <div className="step-title">{step}</div>
            </label>
          </>
        ))}
      </form>
    </section>
  );
};

export default StepBar;
