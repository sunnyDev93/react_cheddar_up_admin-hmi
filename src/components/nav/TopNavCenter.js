import React from 'react';

import logo from 'theme/images/MatildaJaneSprite.png';

const TopNavCenter = () => (
  <div className="text-center">
    {/*<img alt="" className="partner-logo" src={logo} />*/}
    {/*<span className="avenir-roman text-regular gray-thick">*/}
    {/*  Matilda Jane Clothing Sample Sales*/}
    {/*</span>*/}
    {/*<style jsx>{`*/}
    {/*  .partner-logo {*/}
    {/*    margin-right: 0.5rem;*/}
    {/*  }*/}
    {/*`}</style>*/}
  </div>
);

const EnhancedTopNavCenter = React.memo(TopNavCenter);

export default EnhancedTopNavCenter;
