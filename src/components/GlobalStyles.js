import React from 'react';

const GlobalStyles = () => (
  <style jsx global>{`
    .App {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
    }

    .avenir-medium {
      font-family: 'AvenirLTStd-Medium', sans-serif;
    }
    .avenir-roman {
      font-family: 'AvenirLTStd-Roman', sans-serif;
    }
    .avenir-heavy {
      font-family: 'AvenirLTStd-Heavy', sans-serif;
    }
    .avenir-light {
      font-family: 'AvenirLTStd-Light', sans-serif;
    }
    .avenir-light-oblique {
      font-family: 'AvenirLTStd-LightOblique', sans-serif;
    }

    .open-sans {
      font-family: 'Open Sans', sans-serif;
    }
    .merriweather {
      font-family: 'Merriweather', serif;
    }

    .d-flex {
      display: flex !important;
    }
    .d-inline-flex {
      display: inline-flex !important;
    }
    .justify-between {
      justify-content: space-between !important;
    }
    .justify-center {
      justify-content: center !important;
    }
    .items-center {
      align-items: center !important;
    }
    .items-start {
      align-items: flex-start !important;
    }
    .flex-fill {
      flex: 1 !important;
    }

    .italic {
      font-style: italic;
    }

    .text-left {
      text-align: left;
    }
    .text-center {
      text-align: center;
    }
    .text-right {
      text-align: right;
    }
    .text-capitalize {
      text-transform: capitalize;
    }

    .br {
      border-radius: 4px;
    }

    .text-regular {
      font-size: 14px;
      line-height: 22px;
    }
    .text-small {
      font-size: 12px;
      line-height: 18px;
    }

    .fs-18 {
      font-size: 18px;
    }

    .lh-28 {
      line-height: 28px;
    }

    // colors
    .gray-main {
      color: #373737;
    }
    .gray-details {
      color: #3e3f42 !important;
    }
    .gray-icon {
      color: #cecfd2 !important;
    }
    .gray-secondary {
      color: #9ea0a5 !important;
    }
    .gray-medium {
      color: #9d9d9d !important;
    }
    .gray-thick {
      color: #414142 !important;
    }

    .yellow {
      color: #f6ab2e !important;
    }
    .bg-yellow {
      background-color: #f6ab2e !important;
    }
    .teal {
      color: #257a91 !important;
    }
    .bg-teal {
      background-color: #257a91 !important;
    }
    .bg-orange {
      background-color: #f36d36 !important;
    }
    .bg-light-blue-2 {
      background-color: #b0dfe5 !important;
    }
    .white {
      color: #ffffff !important;
    }
    .bg-white {
      background-color: white;
    }

    .card {
      background-color: #ffffff;
      box-shadow: 0px 1px 3px #0000000a;
      border: 1px solid #eaedf3;
      border-radius: 4px;
    }
    .card > div:not(:last-child) {
      border-bottom: 1px solid #eaedf3;
    }
    .card .caption {
      font-family: 'AvenirLTStd-Roman', sans-serif;
      font-size: 12px;
      line-height: 18px;
      color: #9ea0a5;
    }
    .card .amount {
      font-family: 'AvenirLTStd-Roman', sans-serif;
      font-size: 26px;
      line-height: 36px;
      color: #414142;
    }
    .pointer {
      cursor: pointer;
    }
    .p-3 {
      padding: 1.5rem;
    }
    .btn-secondary {
      background-color: #d7eef1 !important;
      border-color: #d7eef1 !important;
    }

    .detail-view-button {
      height: 40px;
      padding: 6.4px 15px;
      border-radius: 4px;
      display: flex;
      justify-content: start;
      align-items: center;
      cursor: pointer;
    }
    .detail-view-button.on {
      color: #257a91;
      background-color: #d7eef1;
      border-color: #d7eef1;
    }

    .details_table-container .ant-table-container {
      border: none !important;
      box-shadow: none !important;
    }
    .details_table-container tr:last-child td {
      border: none;
    }

    .details_page-category-header {
      padding: 1rem 1.5rem;
      font-size: 18px;
    }
    .details_page-category-header-mark {
      border-radius: 4px;
      width: 36px;
      height: 36px;
    }
    .details_page-category-header-title {
      line-height: 26px;
      margin-left: 1.4rem;
    }

    .details_page-category-item {
      padding: 2rem;
      flex: 1;
    }
    .details_page-category-item:not(:last-child) {
      border-right: solid 1px #eaedf3;
    }
    .details_page-category-item caption {
      margin-bottom: 0.5rem;
    }
  `}</style>
);

const EnhancedGlobalStyles = React.memo(GlobalStyles);

export default EnhancedGlobalStyles;
