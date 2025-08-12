import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useState } from 'react';
import { NavLink} from 'react-router-dom';
import { IoMenu, IoHomeOutline, IoAdd } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { TbBrandBinance } from "react-icons/tb";
import { FaList, FaBoxArchive } from "react-icons/fa6";
import classes from "./Sidebar.module.css"

const Sidebars = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <>
            <div className={classes.main} >
                <Sidebar backgroundColor="black" collapsed={collapsed} transitionDuration={1000}>
                    <div className='mx-4'>
                         <div className={classes.profile}>
                            <h4>Ritesh Maurya</h4>
                            <p>Admin</p>
                        </div>
                        <Menu className={classes.menu}>
                            <NavLink to={'/dashboard'} className={({ isActive }) => isActive ? classes.active : ""}>
                                <MenuItem icon={<IoHomeOutline />}>{!collapsed && "Dashboard"}</MenuItem>
                            </NavLink>

                            <div className={({ isActive }) => isActive ? classes.active : ""}>
                                <SubMenu icon={<MdCategory />} label={!collapsed ? "Category" : null}>
                                    <NavLink to={'/dashboard/category-list'} className={({ isActive }) => isActive ? classes.active : ""}>
                                        <MenuItem> <FaList /> &nbsp;&nbsp; Category List</MenuItem>
                                    </NavLink>
                                    <NavLink to={'/dashboard/add-category'} className={({ isActive }) => isActive ? classes.active : ""}>
                                        <MenuItem> <IoAdd /> &nbsp;&nbsp; Add Category</MenuItem>
                                    </NavLink>
                                </SubMenu>
                            </div>
                            <div className={({ isActive }) => isActive ? classes.active : ""}>
                                <SubMenu icon={<MdCategory />} label={!collapsed ? "SubCategory" : null}>
                                    <NavLink to={'/dashboard/category/sub-category-list'} className={({ isActive }) => isActive ? classes.active : ""}>
                                        <MenuItem> <FaList /> &nbsp;&nbsp;Sub Category List</MenuItem>
                                    </NavLink>
                                    <NavLink to={'/dashboard/category/add-sub-category'} className={({ isActive }) => isActive ? classes.active : ""}>
                                        <MenuItem> <IoAdd /> &nbsp;&nbsp; Add Sub Category</MenuItem>
                                    </NavLink>
                                </SubMenu>
                            </div>
                            <div className={({ isActive }) => isActive ? classes.active : ""}>
                                <SubMenu icon={<TbBrandBinance />} label={!collapsed ? "Brand" : null}>
                                    <NavLink to={'/dashboard/brand-list'} className={({ isActive }) => isActive ? classes.active : ""}>
                                        <MenuItem> <FaList /> &nbsp;&nbsp; Brand List</MenuItem>
                                    </NavLink>
                                    <NavLink to={'/dashboard/add-brand'} className={({ isActive }) => isActive ? classes.active : ""}>
                                        <MenuItem> <IoAdd /> &nbsp;&nbsp; Add Brand</MenuItem>
                                    </NavLink>
                                </SubMenu>
                            </div>
                            <div className={({ isActive }) => isActive ? classes.active : ""}>
                                <SubMenu icon={<FaBoxArchive />} label={!collapsed ? "Product" : ""}>
                                    <NavLink to={'/dashboard/product-list'} className={({ isActive }) => isActive ? classes.active : ""}>
                                        <MenuItem> <FaList />&nbsp;&nbsp; Product List</MenuItem>
                                    </NavLink>
                                    <NavLink to={'/dashboard/add-product'} className={({ isActive }) => isActive ? classes.active : ""}>
                                        <MenuItem> <IoAdd />&nbsp;&nbsp; Add Product</MenuItem>
                                    </NavLink>
                                </SubMenu>
                            </div>
                        </Menu>
                    </div>
                </Sidebar>
                <div>
                    <button className={classes.btn} onClick={() => setCollapsed(!collapsed)}>
                        <IoMenu />
                    </button>
                </div>
                {/* <main style={{ color: "black", width:'100%' , margin:'20px'}}> */}
                  {/* {<Dashboard/>} */}
                {/* </main> */}
            </div>

        </>
    )
}

export default Sidebars;