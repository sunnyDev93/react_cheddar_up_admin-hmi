import React from 'react';
import {Spin} from 'antd';

const Loader = () => (
  <div className="loader-container">
    <Spin />
    <style jsx>{`
      .loader-container {
        position: absolute;
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `}</style>
  </div>
);

const EnhancedLoader = React.memo(Loader);

export default EnhancedLoader;
