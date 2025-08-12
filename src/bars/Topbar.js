
import { CgProfile } from "react-icons/cg";
import classes from "./Topbar.module.css";
import logo from '../global/header/bacola-logo.webp';
import mob_logo from '../global/header/bacola-logo-mobile.webp'
import { useNavigate } from "react-router-dom";
function Topbar() {
  const navigate = useNavigate();
  return (
    <div className={` ${classes.main}`}>
        <div className={` ${classes.logo}`}>
              <img src={logo} alt="logo"/>
              <img src={mob_logo} alt="logo" className="d-none"/>
        </div>
      <CgProfile className="fs-2 mt-2" onClick={() => {
        sessionStorage.removeItem('token')
        navigate('/login')
      }} />  
    </div>
  );
}

export default Topbar;