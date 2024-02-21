import React,{useEffect,useState} from "react";
import MasterLayout from "../../layouts/admin/MasterLayout";
import { Link } from "react-router-dom";
import axios from 'axios';



function Dashboard() {
   const [orderCount, setOrderCount] = useState([]);
   useEffect(() => {
      axios.get(`/api/admin-order-count`).then(res => {
          if (res.data.status === 200) {
            setOrderCount(res.data.orderCount);
          }
      });
  }, []);

   const [categoyCount, setCategoyCount] = useState([]);
   useEffect(() => {
      axios.get(`/api/admin-category-count`).then(res => {
          if (res.data.status === 200) {
            setCategoyCount(res.data.categoryCount);
          }
      });
  }, []);
   const [productCount, setProductCount] = useState([]);
   useEffect(() => {
      axios.get(`/api/admin-product-count`).then(res => {
          if (res.data.status === 200) {
            setProductCount(res.data.productCount);
          }
      });
  }, []);




   return (

      <MasterLayout>
         <div className="container-fluid">
            <div className="row">
               <div className="col-lg-4 col-6 mt-4">
                  <div className="small-box card d-flex" style={{ backgroundColor: "#88a889",height:'140px' }}>
                     <div className="d-flex pt-2 pl-3" style={{ fontSize: "44px" }}>
                        <i className="fa-solid fa-cart-flatbed-suitcase" /> <span style={{ fontSize: ' 24px', paddingLeft: "23px" }}> {orderCount}</span>
                     </div>
                     <div className=" d-flex inner">
                        <h4 className="pl-2">Total Orders </h4>
                     </div>
                     <div className="icon">
                        <i className="ion ion-stats-bars"></i>
                     </div>
                     <Link to="/admin/all_order" className="small-box-footer text-dark">More info <i className="fas fa-arrow-circle-right"></i></Link>
                  </div>
               </div>
               <div className="col-lg-4 col-6 mt-4">
                  <div className="small-box card " style={{ backgroundColor: "#54b58e", height:'140px' }}>
                     <div className="d-flex pt-2 pl-2" style={{ fontSize: "44px" }}>
                        <i className="fa-solid fa-store" /> <span style={{ fontSize: "24px", paddingLeft: "23px" }}> {productCount}</span>
                     </div>
                     <div className=" d-flex inner">
                        <h4 className="pl-2">Total Products</h4>
                        <span className="pl-4"><i className="fa-brands fa-quinscape"></i> Quantity : </span>
                     </div>
                     <div className="icon">
                        <i className="ion ion-stats-bars"></i>
                     </div>
                     <Link to="/admin/AllProduct" className="small-box-footer text-dark">More info <i className="fas fa-arrow-circle-right"></i></Link>
                  </div>
               </div>
               <div className="col-lg-4 col-6 mt-4">
                  <div className="small-box card d-flex" style={{ backgroundColor: "#41f158", height:'140px' }}>
                     <div className="d-flex pt-2 pl-3" style={{ fontSize: "44px" }}>
                        <i className="fa-solid fa-sitemap"></i> <span style={{ fontSize: "24px", paddingLeft: "23px" }}>  TK</span>
                     </div>
                     <div className=" d-flex inner">
                        <h4 className="pl-2">Total sale</h4>
                        <span className="pl-4"><i className="fa-solid fa-weight-scale"></i> Today sale :   TK</span>
                     </div>
                     <div className="icon">
                        <i className="ion ion-stats-bars"></i>
                     </div>
                     <Link to="{{ route('orders.index') }}" className="small-box-footer text-dark">More info <i className="fas fa-arrow-circle-right"></i></Link>
                  </div>
               </div>
              
               <div className="col-lg-4 col-6 mt-4">
                  <div className="small-box card d-flex" style={{ backgroundColor: "#caf47b",height:'140px' }}>
                     <div className="d-flex pt-2 pl-3" style={{ fontSize: "44px" }}>
                        <i className="fa-solid fa-cart-shopping"> <span style={{ fontSize: "24px", paddingLeft: "23px" }}>{categoyCount}</span></i>
                     </div>
                     <div className=" d-flex inner">
                        <h4 className="pl-3">Total Category</h4>
                     </div>
                     <div className="icon">
                        <i className="ion ion-stats-bars"></i>
                     </div>
                     <Link to="/admin/allCategory" className="small-box-footer text-dark">More info <i className="fas fa-arrow-circle-right"></i></Link>
                  </div>
               </div>

               <div className="col-lg-4 col-6 mt-4">
                  <div className="small-box card d-flex" style={{ backgroundColor: "rgb(123, 244, 189)" ,height:'140px'}}>
                     <div className="d-flex pt-2 pl-3" style={{ fontSize: "44px" }}>
                        <i className="fa-solid fa-user-plus"> <span style={{ fontSize: "24px", paddingLeft: "23px" }}></span></i>
                     </div>
                     <div className=" d-flex inner">
                        <h4 className="pl-3">Total Customers</h4>
                     </div>
                     <div className="icon">
                        <i className="ion ion-stats-bars"></i>
                     </div>
                     <Link to="{{ route('customers.index') }}" className="small-box-footer text-dark">More info <i className="fas fa-arrow-circle-right"></i></Link>
                  </div>
               </div>
               <div className="col-lg-4 col-6 mt-4">
                  <div className="small-box card d-flex" style={{ backgroundColor: "rgb(232, 183, 49)",height:'140px' }}>
                     <div className="d-flex pt-2 pl-3" style={{ fontSize: "44px" }}>
                        <i className="fa-solid fa-scale-balanced"> <span style={{ fontSize: "24px", paddingLeft: "23px" }}> TK</span></i>
                     </div>
                     <div className=" d-flex inner">
                        <h4 className="pl-3">Daily Expense</h4>


                     </div>
                     <div className="icon">
                        <i className="ion ion-stats-bars"></i>
                     </div>
                     <Link to="{{ route('expenses.index') }}" className="small-box-footer text-dark">More info <i className="fas fa-arrow-circle-right"></i></Link>
                  </div>
               </div>
            </div>
         </div>
      </MasterLayout >
   );
}
export default Dashboard;