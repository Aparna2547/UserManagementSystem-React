import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { logout } from "../../../store/slices/authSlice";
import Api from "../../../services/axios";
function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  const handleLogout = async ()=>{
    const response = await Api.get('/users/logout')
    // if(response.data.status){

    // }
    dispatch(logout())
  }

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid d-flex justify-content-between px-4">
        <Link to="/" className="text-white text-decoration-none fs-5 fw-bold">
          REACT PROJECT
        </Link>

        {!userInfo ? (
          <div className="d-flex">
            <Link
              to="/login"
              className="text-white text-decoration-none mx-2 fw-bold"
            >
              LOGIN
            </Link>
            <Link
              to="/signup"
              className="text-white text-decoration-none fw-bold"
            >
              SIGNUP
            </Link>
          </div>
        ) : (
          <div className="d-flex gap-2">
            <Link to='/profile' className="text-white pe-cursor fs-4">
            
              <FaUserAlt />
            </Link>
            <Button
              onClick={handleLogout}
              className="text-white text-decoration-none fw-bold btn-sm btn-danger"
            >
              LOGOUT
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
