import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "reactstrap";
import { useParams } from "react-router-dom";

// Components
import Breadcrumbs from "adminPanel/adminComponents/Common/Breadcrumb";
import Table from "adminPanel/adminComponents/Table";
import AddressColumns from "./Address/Columns";
import UserColumns from "./Users/Columns";
import OrderColumns from "./Order/Columns";

// Store
import { getUsersAddressByAdmin } from "Store/Address/thunk";
import { getUserById } from "Store/Users/thunks";
import { getOrderById } from "Store/Order/thunks";
import { useTranslation } from "react-i18next";

function ViewCustomer({}) {
  document.title = "Volca | Admin";
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { _id } = useParams();
  const id = Number(atob(_id));

  const { userData } = useSelector((state) => state?.users);
  const { orderList } = useSelector((state) => state?.order);
  const { allAddresess } = useSelector((state) => state?.userAddress);

  const [userColumns, setUserColumns] = useState([{ dataField: "", text: "" }]);
  const [orderColumns, setOrderColumns] = useState([
    { dataField: "", text: "" },
  ]);
  const [adressColumns, setAddressColumns] = useState([
    { dataField: "", text: "" },
  ]);
  const [filter, setfilter] = useState({
    order: -1,
    page: 1,
    limit: 10,
    order_by: "created_at",
    search: "",
    status: "",
  });

  const toggleConfirm = useCallback((customer_id) => {}, []);

  useEffect(() => {
    setOrderColumns(OrderColumns({ toggleConfirm, t }));
    setAddressColumns(AddressColumns({ toggleConfirm, t }));
    setUserColumns(UserColumns({ toggleConfirm, t }));
  }, [toggleConfirm, t]);

  useEffect(() => {
    const data = {
      userId: id,
    };
    const getAllDetails = async () => {
      await dispatch(getUsersAddressByAdmin(data));
      await dispatch(getUserById(data));
      await dispatch(getOrderById(data));
    };
    getAllDetails();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={t("personalDetails")} />
          <Table
            data={userData}
            columns={userColumns || []}
            filter={filter}
            setFilter={setfilter}
          >
            <div className="no_data_found">
              {userData.length === 0 && (
                <h5 className="text-primary">{t("noDataFound")}</h5>
              )}
            </div>
          </Table>
        </Container>

        <Container fluid>
          <Breadcrumbs title={t("address")} />
          <Table
            data={allAddresess}
            columns={adressColumns || []}
            filter={filter}
            setFilter={setfilter}
          >
            <div className="no_data_found">
              {allAddresess.length === 0 && (
                <h5 className="text-primary">{t("noDataFound")}</h5>
              )}
            </div>
          </Table>
        </Container>

        <Container fluid>
          <Breadcrumbs title={t("order")} />
          <Table
            data={orderList}
            columns={orderColumns || []}
            filter={filter}
            setFilter={setfilter}
          >
            <div className="no_data_found">
              {orderList.length === 0 && (
                <h5 className="text-primary">{t("noDataFound")}</h5>
              )}
            </div>
          </Table>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default ViewCustomer;
