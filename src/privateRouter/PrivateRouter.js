import { Navigate, Outlet } from "react-router-dom";
import Sidebar from '../bars/Sidebar';
import Topbar from "../bars/Topbar";

const PrivateRouter = () => {
    const token = sessionStorage.getItem('token');
    console.log("token" ,token);
    
    return (
        <>
            <Topbar />
            <div className="d-flex">
            <Sidebar/> 
            {token?<Outlet/>:<Navigate to='/login'/>}
            </div>
        </>
    )
}
export default PrivateRouter;