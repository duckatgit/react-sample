import React, { useEffect, useState } from "react";
import moment from "moment";

import { Card, CardBody, FormGroup, Input } from "reactstrap";
import { Col, Container, Media, Row } from "reactstrap";

// Breadcrumb
import Breadcrumbs from "adminPanel/adminComponents/Common/Breadcrumb";
// Components
import CardWelcome from "./card-welcome";
import LineChart from "utils/lineChart";
import { useDispatch, useSelector } from "react-redux";
import {
  getPurchaseKpi,
  getSalesKpi,
  getSubscriptionKpi,
  getTopOrdersKpi,
  getTopSalesKpi,
  getTopUsedCoupon,
} from "Store/Dashboard/thunks";
import PieChart from "utils/pieChart";
import BarChart from "utils/barChart";

import { useTranslation } from "react-i18next";

const Dashboard = (props) => {
  //meta title
  document.title = "Volca | Admin";
  const dispatch = useDispatch();
  const {
    salesKpi,
    purchaseKpi,
    topSalesKpi,
    allOrdersKpi,
    subscriptionKpi,
    topUsedCouponKpi,
  } = useSelector((state) => state?.dashboard);
  const [selectedSaleYear, setSelectedSaleYear] = useState(
    new Date().getFullYear()
  );
  const [selectedPurchaseYear, setSelectedPurchaseYear] = useState(
    new Date().getFullYear()
  );
  const [selectedBestSalesYear, setSelectedBestSalesYear] = useState(
    new Date().getFullYear()
  );
  const [selectedOrderYear, setSelectedOrderYear] = useState(
    new Date().getFullYear()
  );
  const [selectedSubscriptionYear, setselectedSubscriptionYear] = useState(
    new Date().getFullYear()
  );
  const [topUsedCouponYear, setTopUsedCouponYear] = useState(
    new Date().getFullYear()
  );
  const [years, setYears] = useState([]);
  const { t } = useTranslation();
  const [salesBarChartData, setSalesBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Sales",
        data: [],
        
        backgroundColor: [
          'rgba(54, 192, 235, 0.5)',
        ],
        borderColor: [
          'rgba(54, 192, 235, 1)',
        ],
      },
    ],
  });
  const [topSalesBarChartData, setTopSalesBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Product Sold",
        data: [],
        backgroundColor: [
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 183, 132, 0.5)',
          'rgba(255, 223, 64, 0.5)',
          'rgba(75, 222, 192, 0.5)',
          'rgba(54, 192, 235, 0.5)',
          'rgba(153, 162, 255, 0.5)',
        ],
        borderColor: [
          'rgba(153, 102, 255, 1)',
          'rgba(255, 183, 132, 1)',
          'rgba(255, 223, 64, 1)',
          'rgba(75, 222, 192, 1)',
          'rgba(54, 192, 235, 1)',
          'rgba(153, 162, 255, 1)',
        ],
        borderWidth: 2,
      },
    ],
  });
  const [OrderBarChartData, setOrderBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Order",
        data: [],
        backgroundColor: [
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 183, 132, 0.5)',
          'rgba(255, 223, 64, 0.5)',
          'rgba(75, 222, 192, 0.5)',
          'rgba(54, 192, 235, 0.5)',
          'rgba(153, 162, 255, 0.5)',
        ],
        borderColor: [
          'rgba(153, 102, 255, 1)',
          'rgba(255, 183, 132, 1)',
          'rgba(255, 223, 64, 1)',
          'rgba(75, 222, 192, 1)',
          'rgba(54, 192, 235, 1)',
          'rgba(153, 162, 255, 1)',
        ],
        borderWidth: 2,
      },
    ],
  });
  const [SubscriptionBarChartData, setSubscriptionBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Subscription",
        data: [],
        backgroundColor: [
          'rgba(255, 223, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 223, 64, 1)',
        ],
        borderWidth: 2,
      },
    ],
  });
  const [purchasePieChartData, setpurchasePieChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Purchased",
        data: [],
        
        backgroundColor: [
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 183, 132, 0.5)',
          'rgba(255, 223, 64, 0.5)',
          'rgba(75, 222, 192, 0.5)',
          'rgba(54, 192, 235, 0.5)',
          'rgba(153, 162, 255, 0.5)',
        ],
        borderColor: [
          'rgba(153, 102, 255, 1)',
          'rgba(255, 183, 132, 1)',
          'rgba(255, 223, 64, 1)',
          'rgba(75, 222, 192, 1)',
          'rgba(54, 192, 235, 1)',
          'rgba(153, 162, 255, 1)',
        ],
        borderWidth: 2,
      },
    ],
  });
  const [usedCoupon, seUsedCoupon] = useState({
    labels: [],
    datasets: [
      {
        label: "Coupon",
        data: [],
        backgroundColor: [
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 183, 132, 0.5)',
          'rgba(255, 223, 64, 0.5)',
          'rgba(75, 222, 192, 0.5)',
          'rgba(54, 192, 235, 0.5)',
          'rgba(153, 162, 255, 0.5)',
        ],
        borderColor: [
          'rgba(153, 102, 255, 1)',
          'rgba(255, 183, 132, 1)',
          'rgba(255, 223, 64, 1)',
          'rgba(75, 222, 192, 1)',
          'rgba(54, 192, 235, 1)',
          'rgba(153, 162, 255, 1)',
        ],
        borderWidth: 2,
      },
    ],
  });

  const reports = [
    {
      title: t("orders"),
      iconClass: "bx-copy-alt",
      description: 0,
    },
    {
      title: t("revenue"),
      iconClass: "bx-archive-in",
      description: 0,
    },
  ];

  const handleSalesYearChange = (event) => {
    setSelectedSaleYear(event.target.value);
  };
  const handlePurchaseYearChange = (event) => {
    setSelectedPurchaseYear(event.target.value);
  };
  const handleTopSalesYearChange = (event) => {
    setSelectedBestSalesYear(event.target.value);
  };

  const handleOrderYearChange = (event) => {
    setSelectedOrderYear(event.target.value);
  };
  const handleSubscriptionYearChange = (event) => {
    setselectedSubscriptionYear(event.target.value);
  };

  const handletopUsedCoupon = (event) => {
    setTopUsedCouponYear(event.target.value);
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2023; year <= currentYear; year++) {
        years.push(year);
    }

    setYears(years);
  }, []);

  useEffect(() => {
    dispatch(getSalesKpi({ search: Number(selectedSaleYear) }));
  }, [selectedSaleYear]);

  useEffect(() => {
    dispatch(getPurchaseKpi({ search: Number(selectedPurchaseYear) }));
  }, [selectedPurchaseYear]);

  useEffect(() => {
    dispatch(getTopSalesKpi({ search: Number(selectedBestSalesYear) }));
  }, [selectedBestSalesYear]);

  useEffect(() => {
    dispatch(getTopOrdersKpi({ search: Number(selectedOrderYear) }));
  }, [selectedOrderYear]);

  useEffect(() => {
    dispatch(getSubscriptionKpi({ search: Number(selectedSubscriptionYear) }));
  }, [selectedSubscriptionYear]);

  useEffect(() => {
    dispatch(getTopUsedCoupon({ search: Number(topUsedCouponYear) }));
  }, [topUsedCouponYear]);

  useEffect(() => {
    setSalesBarChartData({
      labels: salesKpi?.label || [],
      datasets: [
        {
          label: "Sales",
          data: salesKpi?.value || [],
          backgroundColor: [
            'rgba(54, 192, 235, 0.5)',
          ],
          borderColor: [
            'rgba(54, 192, 235, 1)',
          ],
        },
      ],
    });
  }, [salesKpi]);

  useEffect(() => {
    seUsedCoupon({
      labels: topUsedCouponKpi?.label || [],
      datasets: [
        {
          label: "Coupon",
          data: topUsedCouponKpi?.value || [],
          backgroundColor: [
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 183, 132, 0.5)',
            'rgba(255, 223, 64, 0.5)',
            'rgba(75, 222, 192, 0.5)',
            'rgba(54, 192, 235, 0.5)',
            'rgba(153, 162, 255, 0.5)',
          ],
          borderColor: [
            'rgba(153, 102, 255, 1)',
            'rgba(255, 183, 132, 1)',
            'rgba(255, 223, 64, 1)',
            'rgba(75, 222, 192, 1)',
            'rgba(54, 192, 235, 1)',
            'rgba(153, 162, 255, 1)',
          ],
          borderWidth: 2,
        },
      ],
    });
  }, [topUsedCouponKpi]);

  useEffect(() => {
    setTopSalesBarChartData({
      labels: topSalesKpi.label||[],
    datasets: [
      {
        label: "Product Sold",
        data: topSalesKpi.value||[],
        backgroundColor: [
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 183, 132, 0.5)',
          'rgba(255, 223, 64, 0.5)',
          'rgba(75, 222, 192, 0.5)',
          'rgba(54, 192, 235, 0.5)',
          'rgba(153, 162, 255, 0.5)',
        ],
        borderColor: [
          'rgba(153, 102, 255, 1)',
          'rgba(255, 183, 132, 1)',
          'rgba(255, 223, 64, 1)',
          'rgba(75, 222, 192, 1)',
          'rgba(54, 192, 235, 1)',
          'rgba(153, 162, 255, 1)',
        ],
        borderWidth: 2,
      },
    ],
    });
  }, [topSalesKpi]);

  useEffect(() => {
    setSubscriptionBarChartData({
      labels: subscriptionKpi?.label || [],
      datasets: [
        {
          label: "Subscription",
          data: subscriptionKpi?.value || [],
          backgroundColor: [
            'rgba(255, 223, 64, 0.5)',
          ],
          borderColor: [
            'rgba(255, 223, 64, 1)',
          ],
          borderWidth: 2,
        },
      ],
    });
  }, [subscriptionKpi]);

  useEffect(() => {
    setOrderBarChartData({
      labels: allOrdersKpi?.label || [],
      datasets: [
        {
          label: "Order",
          data: allOrdersKpi?.value || [],
          backgroundColor: [
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 183, 132, 0.5)',
            'rgba(255, 223, 64, 0.5)',
            'rgba(75, 222, 192, 0.5)',
            'rgba(54, 192, 235, 0.5)',
            'rgba(153, 162, 255, 0.5)',
          ],
          borderColor: [
            'rgba(153, 102, 255, 1)',
            'rgba(255, 183, 132, 1)',
            'rgba(255, 223, 64, 1)',
            'rgba(75, 222, 192, 1)',
            'rgba(54, 192, 235, 1)',
            'rgba(153, 162, 255, 1)',
          ],
          borderWidth: 2,
        },
      ],
    });
  }, [allOrdersKpi]);

  

  useEffect(() => {
    setpurchasePieChartData({
      labels: purchaseKpi?.label || [],
      datasets: [
        {
          label: "Purchased",
          data: purchaseKpi?.value || [],
          backgroundColor: [
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 183, 132, 0.5)',
            'rgba(255, 223, 64, 0.5)',
            'rgba(75, 222, 192, 0.5)',
            'rgba(54, 192, 235, 0.5)',
            'rgba(153, 162, 255, 0.5)',
          ],
          borderColor: [
            'rgba(153, 102, 255, 1)',
            'rgba(255, 183, 132, 1)',
            'rgba(255, 223, 64, 1)',
            'rgba(75, 222, 192, 1)',
            'rgba(54, 192, 235, 1)',
            'rgba(153, 162, 255, 1)',
          ],
          borderWidth: 2,
        },
      ],
    });
  }, [purchaseKpi]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={t("dashboard")} />

          <Row style={{ marginTop: "20px" }}>
            <Col md="6" className="relative">
              <h5>{t("totalSale")}</h5>
              <FormGroup className="mb-0">
               
                <Input
                  type="select"
                  className="form-control fit-content ts"
                  name="year"
                  value={selectedSaleYear}
                  onChange={handleSalesYearChange}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <LineChart data={salesBarChartData} />
            </Col>

            <Col md="6">
              <h5> {t("orders")}</h5>
              <FormGroup className="mb-0">
                <Input
                  type="select"
                  className="form-control fit-content ts"
                  name="year"
                  value={selectedOrderYear}
                  onChange={handleOrderYearChange}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <BarChart data={OrderBarChartData} />
            </Col>
          </Row>

          <Row style={{ marginTop: "20px" }}>
            <Col md="6">
              <h5> {t("topProductSoldState")}</h5>
              <FormGroup className="mb-0">
                <Input
                  type="select"
                  className="form-control fit-content ts"
                  name="year"
                  value={selectedBestSalesYear}
                  onChange={handleTopSalesYearChange}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <BarChart data={topSalesBarChartData} />
            </Col>
            <Col md="6">
            <h5> {t("subscriptionDetail")}</h5>
            <FormGroup className="mb-0">
              <Input
                type="select"
                className="form-control fit-content ts"
                name="year"
                value={selectedSubscriptionYear}
                onChange={handleSubscriptionYearChange}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <LineChart data={SubscriptionBarChartData} />
          </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
          <Col md="6">
          <h5> {t("topPurchaseProduct")}</h5>
          <FormGroup className="mb-0">
            <Input
              type="select"
              className="form-control fit-content ts"
              name="year"
              value={selectedPurchaseYear}
              onChange={handlePurchaseYearChange}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Input>
          </FormGroup>
          <PieChart data={purchasePieChartData} />
        </Col>
            <Col md="6">
              <h5> {t("topUsedCoupon")}</h5>
              <FormGroup>
                <Input
                  type="select"
                  className="form-control fit-content ts"
                  name="year"
                  value={topUsedCouponYear}
                  onChange={handletopUsedCoupon}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <PieChart data={usedCoupon} />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
