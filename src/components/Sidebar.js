import React from 'react';

export function Sidebar({
  filterFlagged,
  updateFilterFlagged
  }) {

  const handleCheck =
    ({target: {checked}}) => updateFilterFlagged(checked);

  return (
    <div className="content">
      <h3>
        Sidebar Tools
      </h3>

      <label className="label">
        Sort By
      </label>
      <p className="control">
        <span className="select">
          <select>
            <option>Most Recent</option>
            <option>Least Recent</option>
          </select>
        </span>
      </p>

      <label className="label">
        Filter By
      </label>

      <div>
        <label className="checkbox">
          <input
            type="checkbox"
            checked={filterFlagged}
            onChange={handleCheck}
          />
          Flagged
        </label>
      </div>

      <div>
        <label className="checkbox is-disabled">
          <input
            type="checkbox"
            disabled
          />
          Unread
        </label>
      </div>
    </div>
  );
}
