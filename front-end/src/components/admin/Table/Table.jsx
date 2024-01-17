import React, { useEffect, useState } from "react";
import "./Table.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Api from "../../../services/axios";
import axios from "axios";
import { toast } from "react-toastify";
import ConfirmModal from "../Modal/Modal";

const Table = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [deleteId,setDeleteId] = useState('')


  //for modals
  const [modal,setModal] = useState(false)



  const openModal = async (userId)=>{
    setModal(true)
    setDeleteId(userId)
  }

  const closeModal=()=>{
    setModal(false)
  }



  const deleteUser = async () => {
    
      try {
        const response = await Api.delete(`/admin/deleteuser/${deleteId}`);
        console.log(response.data);
        toast.success("user deleted  successfully");
        setUsers(users.filter((user) => user._id !== deleteId));
        setModal(false)
      } catch (error) {
        console.error("Error deleting user:", error);
      }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Api.get(`/admin/users?search=${searchTerm}`);
        setUsers(response.data.userData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [searchTerm]);

  return (
    <>
      <div className="container mt-4">
        <div className="table-wrapper">
          <div className="table-title">
            <h1 className="text-center">User Details</h1>
            <div className="row">
              <div className="col-xs-12 col-sm-8">
                <Link to="/admin/adduser" className="btn btn-secondary">
                  Add new user
                </Link>
              </div>
              <div className="col-xs-12 col-sm-4">
                <form className="search-box d-flex">
                  <input
                    type="text"
                    name="search"
                    className="form-control d-inline"
                    placeholder="Enter the name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </form>
              </div>
            </div>
          </div>
          <table className=" table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <Link
                        to={`/admin/edituser/${user._id}`}
                        className="btn btn-primary btn-sm mx-3"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm mx-3"
                        onClick={() => openModal(user._id)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>User not Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmModal modal={modal} closeModal={closeModal} deleteUser={deleteUser}/>
    </>
  );
};

export default Table;
