import React from "react";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav className="sb-sidenav accordion sb-sidenav-info" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav sidenavAccordionPages">

                    <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                        <Link className="nav-link" to="#">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Dashboard
                        </Link>

                        <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                        <i class="fa-solid fa-file-circle-check"></i> <span className="ms-2">Task</span> 
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link className="nav-link" to="/admin/allTask">All Task</Link>
                                <Link className="nav-link" to="/admin/addTask">Add Task</Link>
                                <Link className="nav-link" to="#"></Link>
                            </nav>
                        </div>

                        <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                        <i class="fa-solid fa-cart-plus"></i> <span className="ms-2">Product</span> 
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link className="nav-link" to="#">Add Product</Link>
                                <Link className="nav-link" to="#">All product</Link>
                                <Link className="nav-link" to="#">Edit Category</Link>
                            </nav>
                        </div>
                    </nav>
                </div>
            </div>
        </nav>
    );
}
export default Sidebar;