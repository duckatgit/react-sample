import React, { memo } from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Button } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
function Table(props) {
  const handleTableChange = () => {};
  if (props.columns.length <= 0) return <React.Fragment></React.Fragment>;
  return (
    <>
      <Card
        className="no-shadow"
        style={{ background: "transparent", margin: "0" }}
      >
        <CardBody
          className="pt-0 px-0"
          style={{
            marginTop: "-45pxx",
            marginBottom: "0 !important !important",
          }}
        >
          <ToolkitProvider
            keyField="_id"
            data={props?.data}
            columns={props?.columns}
            bootstrap4
            search
          >
            {(toolkitProps) => (
              <React.Fragment>
                {props.children}
                <div
                  className="line_one form-group d-flex align-items-center justify-content-end"
                  style={{ gap: "5px, flex-wrap: wrap" }}
                >
                  <div className="clearfix float-right">
                    {props.newButtonText && (
                      <Button
                        type="button"
                        color="success"
                        className="float-end main-topright-btn user custombtm"
                        onClick={props.newButtonLink}
                      >
                        {props.newButtonText}
                      </Button>
                    )}
                  </div>
                </div>
                <div className="table-responsive mt-3">
                  <BootstrapTable
                    responsive
                    remote
                    bordered={false}
                    striped={false}
                    classes="table table-centered table-nowrap"
                    headerWrapperClasses={"thead-light"}
                    onTableChange={handleTableChange}
                    {...toolkitProps.baseProps}
                    {...props.tableProps}
                  />
                </div>
              </React.Fragment>
            )}
          </ToolkitProvider>
        </CardBody>
      </Card>
    </>
  );
}
Table.propTypes = {
  total: PropTypes.number,
  newButtonLink: PropTypes.func,
  newButtonText: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object),
  handleTableChange: PropTypes.func,
  tableProps: PropTypes.object,
};
Table.defaultProps = {
  total: 0,
  data: [],
  columns: [],
  tableProps: {},
  newButtonText: "",
};
export default memo(Table);
