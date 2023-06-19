import React from 'react';

const AccountOverlay = ({name, isAdmin}) => {
  const gotoCheddarUp = () => {
    window.location.href = '/';
  };

  return (
    <>
      <ul className="account-overlay">
        <li>
          <div className="gray-main">
            <div className="text-regular avenir-medium">{name}</div>
            {isAdmin && (
              <div className="text-small merriweather italic">
                Administrator
              </div>
            )}
          </div>
        </li>
        <li>
          <div
            className="text-regular avenir-medium teal pointer"
            onClick={gotoCheddarUp}
          >
            Back to Cheddar Up
          </div>
        </li>
      </ul>
      <style jsx="true">{`
        .account-overlay {
          padding: 0;
          list-style: none;
          background: #ffffff 0% 0% no-repeat padding-box;
          box-shadow: 0px 1px 2px #00000014;
          border: 1px solid #d8dce6;
          border-radius: 4px;
        }
        .account-overlay li > div {
          padding: 0.625rem 1.25rem;
        }
      `}</style>
    </>
  );
};

export default AccountOverlay;
