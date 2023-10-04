import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffectUpdate } from "../hooks/useEffectUpdate";

export function EmailFilter({ onSetFilter, filterBy }) {
  const [filterByToEdit, setfilterByToEdit] = useState(filterBy);

  useEffectUpdate(() => {
    onSetFilter(filterByToEdit);
  }, [filterByToEdit]);

  function handleChange({ target }) {
    let { name: field, value, type } = target;
    switch (type) {
      case "number":
      case "range":
        value = +value || "";
        break;
      case "select-one":
        value = JSON.parse(value);
        break;
      case "checkbox":
        value = target.checked;
      default:
        break;
    }
    setfilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  function onSubmitFilter(ev) {
    ev.preventDefault();
    console.log("filterby", filterBy);
    onSetFilter(filterByToEdit);
  }

  return (
    <form onSubmit={onSubmitFilter} className="index-nav-filter">
      <label htmlFor="text"></label>
      <div className="search-bar">
        <span>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Search Email"
          name="text"
          id="text"
        ></input>
      </div>
      <select onChange={handleChange} name="isRead">
        <option value={"null"}>All</option>
        <option value={"false"}>Unread</option>
        <option value={"true"}>Read</option>
      </select>
    </form>
  );
}
