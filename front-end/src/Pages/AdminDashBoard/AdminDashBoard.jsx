import React from "react";
import Header from "../../components/admin/home/Header";
import Table from "../../components/admin/Table/Table";

const AdminDashBoard = () => {
  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-items-center" style={{height:'90vh'}}>
      <Table />
      </div>
    </>
  );
};

export default AdminDashBoard;
