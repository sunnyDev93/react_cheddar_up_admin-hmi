import React from 'react';
import {Row, Col} from 'antd';

import logo from 'theme/images/Logo.png';

const TopNavLogo = () => (
  <div className="text-left">
    <Row>
      <Col>
        <img alt="" style={{marginRight: '8px'}} src={logo} />
      </Col>
    </Row>

    <style jsx>{`
      .logo-text {
        line-height: 1;
      }
      .logo-text:first-child {
        font-weight: bold;
        color: #323232;
      }
      .logo-text:last-child {
        font-style: italic;
        color: #323232;
      }
    `}</style>
  </div>
);

const EnhancedTopNavLogo = React.memo(TopNavLogo);

export default EnhancedTopNavLogo;
