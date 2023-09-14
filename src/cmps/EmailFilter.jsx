import { useEffect, useState } from "react";

export function EmailFilter({ onSetFilter, filterBy }) {
  const [filterByToEdit, setfilterByToEdit] = useState(filterBy);

  useEffect(() => {
    onSetFilter(filterByToEdit);
  }, [filterByToEdit]);

  function handleChange(ev) {
    let { value, name, type } = ev.target;
    if (type === "select-one") {
      value = JSON.parse(value);
    }
    setfilterByToEdit((prevFilter) => ({ ...prevFilter, [name]: value }));
  }

  function onSubmitFilter(ev) {
    ev.preventDefault();

    onSetFilter(filterByToEdit);
  }

  return (
    <form onSubmit={onSubmitFilter} className="email-filter p20">
      <select onChange={handleChange} name="isRead">
        <option value={"null"}>All</option>
        <option value={"false"}>Unread</option>
        <option value={"true"}>Read</option>
      </select>
      <label htmlFor="text">Text: </label>
      <input
        onChange={handleChange}
        type="text"
        placeholder="Search by text"
        name="text"
        id="text"
      ></input>
    </form>
  );
}
//         id: "e101",
//         subject: "Miss you!",
//         body: "Would love to catch up sometimes",
//         isRead: false,
//         isStarred: false,
//         sentAt: 1551133930594,
//         removedAt: null, //for later use
//         from: "momo@momo.com",
//         to: "user@appsus.com",
