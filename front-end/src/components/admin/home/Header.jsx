import { FaUserAlt } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { adminLogout, logout } from "../../../store/slices/authSlice";
import Api from "../../../services/axios";
import { toast } from "react-toastify";
function Header() {

  // const { adminInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
const navigate = useNavigate()
  const handleLogout = async()=>{
    try {
      const response = await Api.get(`/admin/logout`)
      if(response.data.status){
        dispatch(adminLogout())
        navigate('/admin')
        toast.success('you are logouted ...')
      }
      
    } catch (error) {
      console.error(error.message)
    }
  }
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid d-flex justify-content-between px-4">
        <Link to="/admin/dashboard" className="text-white text-decoration-none fs-5 fw-bold">
          REACT PROJECT
        </Link>

          <div className="d-flex gap-2">
            <Button
              onClick={handleLogout}
              className="text-white text-decoration-none fw-bold btn-sm btn-danger"
            >
              LOGOUT
            </Button>
          </div>
      </div>
    </nav>
  );
}

export default Header;
