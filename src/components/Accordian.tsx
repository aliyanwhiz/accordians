import { useState, useEffect } from "react";
import "./style.css";
import data from "../data";

const Accordian = () => {
  const [clicked, setClicked] = useState<number | null>(null);
  const [MultiSelection, setMultiSelection] = useState<boolean>(false);
  const [Multiple, setMultiple] = useState<number[]>([]);

  const handleSingleClick = (id: number) => {
    setClicked(id === clicked ? null : id);
  };

  const handleMultiClick = (id: number) => {
    let cpyMultiple = [...Multiple];
    const currentIndex = cpyMultiple.indexOf(id);
    if (currentIndex === -1) {
      cpyMultiple.push(id);
    } else {
      cpyMultiple.splice(currentIndex, 1); // Remove the item at currentIndex
    }
    setMultiple(cpyMultiple); // Update the state with the new array
  };

  useEffect(() => {
    const toggleSwitch: any = document.getElementById("toggle");

    const handleToggleChange = () => {
      setMultiSelection(toggleSwitch.checked);
      setMultiple([])
      setClicked(null)
    };

    toggleSwitch.addEventListener("change", handleToggleChange);

    return () => {
      toggleSwitch.removeEventListener("change", handleToggleChange);
    };
  }, []);

  return (
    <div className="container">
      <div className="toggle-switch">
        <input className="toggle-input" id="toggle" type="checkbox" />
        <label className="toggle-label" htmlFor="toggle"></label>
        <p>{MultiSelection ? "Multi" : "Single"} Selection is active</p>
      </div>

      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((item) => (
            <div className="item" key={item.id}>
              <div
                className="title"
                onClick={
                  MultiSelection
                    ? () => handleMultiClick(item.id)
                    : () => handleSingleClick(item.id)
                }
              >
                <h3>{item.question}</h3>
                <span>+</span>
              </div>
              <div className="answer">
                {MultiSelection
                  ? Multiple.indexOf(item.id) !== -1 && <p>{item.answer}</p>
                  : clicked === item.id && <p>{item.answer}</p>}
                {/* {clicked === item.id || Multiple.indexOf(item.id) !== -1 ? <p>{item.answer}</p> : null} */}
              </div>
            </div>
          ))
        ) : (
          <div className="unused">Data not found</div>
        )}
      </div>
    </div>
  );
};

export default Accordian;
