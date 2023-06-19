import React, {useState} from 'react';
import {Avatar, Button, Col, PageHeader, Row} from 'antd';
import {EllipsisOutlined} from '@ant-design/icons';
import {Link, useParams, useLocation} from 'react-router-dom';
import {useQuery} from 'react-query';
import {useCubeQuery} from '@cubejs-client/react';

import SalesPageDetail from 'theme/images/SharedCollectionBannerPlaceholder.svg';
import SalesQueryTypes from 'services/query-types/sales';
import {CUBE_DISTRIBUTORS} from 'services/cube-query/distributors';
import ImagesUtils from 'services/image.service';
import {getCollectionDetail} from 'services/sales.service';
import {AccountIcon} from 'components/icons';
import Payments from './Payments';
import Products from './Products';
import CollectionSummary from './CollectionSummary';
import Visitors from './Visitors';

const SalesPagePage = () => {
  const [detailView, setDetailView] = useState('payments');
  let {id} = useParams();
  let uuid = useLocation().state ? useLocation().state.uuid : null;
  let email = useLocation().state ? useLocation().state.email : null;

  const {data: result} = useQuery(
    SalesQueryTypes.REST_SINGLE_SALE,
    () => getCollectionDetail(id, uuid),
    {enabled: !!id && !!uuid, refetchOnWindowFocus: false}
  );

  const {resultSet: distributors} = useCubeQuery({
    ...CUBE_DISTRIBUTORS,
    filters: [
      {
        member: 'EnhancedUsers.email',
        operator: 'equals',
        values: [`${email}`],
      },
    ],
    timeDimensions: [],
  });
  const dataSource = distributors?.tablePivot() || [];
  const distributor =
    dataSource && dataSource.length > 0 ? dataSource[0] : null;
  const imageUrl = distributor
    ? ImagesUtils.getImageUrl(distributor['EnhancedUsers.profilePicturePath'])
    : null;

  return (
    <>
      <PageHeader
        title={
          <>
            <span className="avenir-roman">{result?.name}</span>{' '}
          </>
        }
        style={{paddingTop: '23px', paddingBottom: '15px', color: '#414142'}}
        ghost={false}
        extra={[
          <Button
            key="sales"
            size="small"
            style={{
              fontSize: '12px',
              lineHeight: '18px',
              backgroundColor: '#B0DFE5',
              borderColor: '#E2E5ED',
              color: '#3E3F42',
              width: '67px',
            }}
            className="avenir-medium text-capitalize br btn__disable"
          >
            Active
          </Button>,
        ]}
      />

      <div className="d-flex page-content">
        <div className="overview-n-account">
          <div className="overview card">
            <img
              className="collection-image"
              alt=""
              src={
                result
                  ? result?.theme?.image
                    ? ImagesUtils.getImageUrl(
                        result?.theme?.image.upload_path,
                        result?.theme?.image?.metadata?.thumbnail?.cropDetails,
                        {width: 349, height: 123}
                      )
                    : SalesPageDetail
                  : null
              }
            />
            <div className="p-3 gray-main">
              <div className="avenir-roman fs-18">{result?.name}</div>
              <div
                className="text-small avenir-roman"
                style={{padding: '0.75rem 0'}}
              >
                {result?.description}
              </div>
              <div style={{marginTop: '1.25rem'}}>
                <Link className="text-regular" to={`/dashboard/sales-pages`}>
                  View Collection Page
                </Link>
              </div>
            </div>
            <div className="p-3">
              <Row className="justify-between" style={{marginBottom: '1rem'}}>
                <Col span={12} className="gray-medium text-small">
                  COLLECTOR
                </Col>
                <Col span={12} className="gray-details">
                  <Link
                    style={{
                      fontSize: '2rem',
                      display: 'flex',
                      color: '#9EA0A5',
                      marginTop: '-7px',
                      marginBottom: '-7px',
                      justifyContent: 'flex-end',
                    }}
                    to={`/dashboard/distributors/${result?.organizer?.id}`}
                  >
                    <EllipsisOutlined style={{color: '#9EA0A5'}} />
                  </Link>
                </Col>
              </Row>
              <Row>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <div style={{marginRight: '19px'}}>
                    {imageUrl ? (
                      <Avatar size="large" src={imageUrl} />
                    ) : (
                      <AccountIcon
                        className="gray-medium"
                        style={{
                          fontSize: '1rem',
                          verticalAlign: 'middle',
                          margin: '0 1rem',
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <div className="avenir-medium fs-18 lh-28 gray-details">
                      {result?.organizer?.name}
                    </div>{' '}
                    <div className="avenir-roman gray-medium text-regular">
                      {result?.organizer?.email}
                    </div>
                  </div>
                </div>
              </Row>
            </div>
            <div className="p-3 avenir-roman">
              <div style={{margin: '0 -0.75rem'}}>
                <div
                  className={`detail-view-button${
                    detailView === 'payments' ? ' on' : ''
                  }`}
                  onClick={() => {
                    setDetailView('payments');
                  }}
                >
                  Payments
                </div>
              </div>
              {/*<div style={{margin: '0 -0.75rem'}}>*/}
              {/*  <div*/}
              {/*    className={`detail-view-button${*/}
              {/*      detailView === 'products' ? ' on' : ''*/}
              {/*    }`}*/}
              {/*    onClick={() => {*/}
              {/*      setDetailView('products');*/}
              {/*    }}*/}
              {/*  >*/}
              {/*    Products*/}
              {/*  </div>*/}
              {/*</div>*/}
              <div style={{margin: '0 -0.75rem'}}>
                <div
                  className={`detail-view-button${
                    detailView === 'collection_summary' ? ' on' : ''
                  }`}
                  onClick={() => {
                    setDetailView('collection_summary');
                  }}
                >
                  Collection Summary
                </div>
              </div>
              <div style={{margin: '0 -0.75rem'}}>
                <div
                  className={`detail-view-button${
                    detailView === 'visitors' ? ' on' : ''
                  }`}
                  onClick={() => {
                    setDetailView('visitors');
                  }}
                >
                  Visitors
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-fill">
          {detailView === 'payments' && (
            <Payments
              id={id}
              uuid={uuid}
              salesPageTitle={result?.name}
              paymentTotal={result?.payments_total}
              balance={result?.withdrawal_balance_available}
              itemCount={result?.reportsAvailable?.itemsCount}
            />
          )}
          {detailView === 'products' && <Products data={result} />}
          {detailView === 'collection_summary' && (
            <CollectionSummary data={result} id={id} uuid={uuid} />
          )}
          {detailView === 'visitors' && (
            <Visitors data={result} id={id} uuid={uuid} />
          )}
        </div>
      </div>

      <style jsx="true">{`
        .page-content {
          margin-top: 15px;
        }
        .overview-n-account {
          width: 350px;
          margin-right: 20px;
        }
        .overview {
          margin-bottom: 20px;
        }
        .role {
          font-size: 13px;
          line-height: 20px;
        }
        .account-info__title {
          margin-bottom: 1.25rem;
        }
        .account-info__details > div {
          display: flex;
          padding: 0.25rem 0;
        }
        .account-info__details-text {
          font-size: 14px;
          line-height: 22px;
          font-family: 'AvenirLTStd-Roman', sans-serif;
          color: #3e3f42;
        }
        .collection-image {
          width: 100%;
        }
      `}</style>
    </>
  );
};

const EnhancedSalesPagePage = React.memo(SalesPagePage);

export default EnhancedSalesPagePage;
