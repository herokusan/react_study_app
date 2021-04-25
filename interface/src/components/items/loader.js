import React from "react";

export const Loader = () => (
  <div>
    <div className="d-flex justify-content-center">
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </div>
);