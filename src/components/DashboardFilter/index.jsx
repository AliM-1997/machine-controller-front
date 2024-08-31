import React from "react";
import "./style.css";
import ReactDate from "../../base/ReactDate";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
const DashboardFilter = () => {
  return (
    <div>
      <div>
        <h3>date</h3>
        <ReactDate leftIcon={faCalendarAlt} mindata={false} />
        <div>
          <h3>Between Date</h3>
          <div>
            <ReactDate leftIcon={faCalendarAlt} mindata={false} />
            <ReactDate leftIcon={faCalendarAlt} mindata={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardFilter;
