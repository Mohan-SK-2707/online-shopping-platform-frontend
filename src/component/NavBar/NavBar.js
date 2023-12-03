import React, { Component } from 'react';
import UserTable from "../User/UserTable";
import ExcelTable from '../Excel/ExcelTable';
import OrdersTable from '../Orders/OrdersTable';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserTable: false,
      showOrdersTable: false,
      showExcelTable: false,
    };
  }

  fetchUserData = () => {
    this.setState({ showExcelTable: false });
    this.setState({ showUserTable: true });
    this.setState({ showOrdersTable: false });
  };

  fetchExcelData = () => {
    this.setState({ showExcelTable: true });
    this.setState({ showUserTable: false });
    this.setState({ showOrdersTable: false });
  };

  fetchOrdersData = () => {
    this.setState({ showExcelTable: false });
    this.setState({ showUserTable: false });
    this.setState({ showOrdersTable: true });
  }

  fetchLogoutPage = () => {
  }


  render() {
    const { showUserTable } = this.state;
    const { showExcelTable } = this.state;
    const { showOrdersTable } = this.state;
    return (
      <>
        <div id="user-container">
          <div class="usermainlable"><h2>E-Com shopping portal</h2> </div>
          <div class="usertab" onClick={this.fetchUserData}> <h3>Users</h3> </div>
          <div class="orderstab" onClick={this.fetchOrdersData}><h3>Orders</h3>  </div>
          <div class="exceltab" onClick={this.fetchExcelData}><h3>Excel</h3>  </div>
          <div class="logoutbtn" onClick={this.fetchLogoutPage}> <h3>Logout</h3> </div>
        </div>
        {showUserTable && <UserTable />}
        {showExcelTable && <ExcelTable />}
        {showOrdersTable && <OrdersTable />}
      </>
    );
  }
}

export default NavBar;
