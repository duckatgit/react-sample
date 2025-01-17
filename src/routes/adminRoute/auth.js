import React from "react"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux";


const Authmiddleware = props => {
  const { sideDashboard } = useSelector((state) => state?.dashboard);
  const {admin} = useSelector((state)=>state?.auth)
  if (localStorage.getItem("authAdmin")) {
  if(admin?.id==1){
    return (
      <Navigate
        to={{
          pathname: `/admin/dashboard`,
        }}
      />
    );
  }
    for(let item of sideDashboard){
      if(admin.permission.includes(item.slug)){
       
        return (
          <Navigate
            to={{
              pathname: `/admin${item.pattern}`,
            }}
          />
        );
      }
    }
  }
  return <React.Fragment>{props.children}</React.Fragment>
}

export default Authmiddleware
