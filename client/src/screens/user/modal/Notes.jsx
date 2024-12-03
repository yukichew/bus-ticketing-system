import React from "react";
import Bullets from "../../../components/common/Bullets";
import TripSummary from "../../../components/user/TripSummary";
import { policies } from "../../../constants/Dummy";

const Notes = ({ schedule }) => {
  return (
    <>
      {/* boarding and dropping points */}
      <div className='mb-5 pb-5 border-b-2'>
        <h2 className='text-lg font-semibold mb-3'>
          Boarding and Dropping Points
        </h2>
        <TripSummary schedule={schedule} />
      </div>

      {/* policies */}
      <Bullets contents={policies} />
    </>
  );
};

export default Notes;
