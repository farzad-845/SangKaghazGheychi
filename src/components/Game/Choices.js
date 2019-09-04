import React from "react";

const Choices = ({ options, selected, onChange }) => {
  return (
    <form>
      <div className="cc-selector">
        {options.map((choice, index) => (
          <React.Fragment key={index}>
            <input
              checked={selected === choice.value}
              type="radio"
              name="weapon"
              id={choice.value}
              value={choice.value}
              key={index}
              onChange={onChange}
            />
            <label
              className={`drinkcard-cc ${choice.value}`}
              htmlFor={choice.value}
            ></label>
          </React.Fragment>
        ))}
      </div>
    </form>
  );
};

export default Choices;
