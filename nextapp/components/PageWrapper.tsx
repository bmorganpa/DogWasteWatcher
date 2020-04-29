import React from "react";

export const PageWrapper: React.FC = ({ children }) => {
  return (
    <div className="container">
      {children}
      <style jsx>{`
        .container {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }
      `}</style>
    </div>
  );
};
