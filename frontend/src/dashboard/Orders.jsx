import React from "react"
import "./Orders.scss"
import { useState, useEffect } from "react"
import ordersData from "../data/data.json"
import { FaBox, FaDollarSign, FaClock, FaTruck } from "react-icons/fa"
import { FiSearch } from "react-icons/fi"

export const Orders = () => {
  const [statusFilter, setStatusFilter] = useState("All")
  const [filteredOrders, setFilteredOrders] = useState([])

  useEffect(() => {
    if (statusFilter === "All") {
      setFilteredOrders(ordersData)
    } else {
      setFilteredOrders(
        ordersData.filter(order => order.status === statusFilter)
      )
    }
  }, [statusFilter])

  const statusCounts = {
    All: ordersData.length,
    Processing: ordersData.filter(order => order.status === "Processing")
      .length,
    Shipped: ordersData.filter(order => order.status === "Shipped").length,
    Completed: ordersData.filter(order => order.status === "Completed").length,
    Cancelled: ordersData.filter(order => order.status === "Cancelled").length
  }

  return (
    <div className="orders-page">
      <h1>Order Management</h1>
      <div className="summary-boxes">
        <div className="box total-orders">
          <FaBox className="icon" />
          <div>
            <p>Total Orders</p>
            <h3>8</h3>
          </div>
        </div>

        <div className="box total-revenue">
          <FaDollarSign className="icon" />
          <div>
            <p>Total Revenue</p>
            <h3>$1,179.88</h3>
          </div>
        </div>

        <div className="box processing">
          <FaClock className="icon" />
          <div>
            <p>Processing</p>
            <h3>2</h3>
          </div>
        </div>

        <div className="box shipped">
          <FaTruck className="icon" />
          <div>
            <p>Shipped</p>
            <h3>2</h3>
          </div>
        </div>
      </div>

      <div className="filters-row">
        <div className="search-wrapper">
          <FiSearch />
          <input
            type="text"
            placeholder="Search orders..."
            className="searchBar"
          />
        </div>
        <select>
          <option>All Status</option>
          <option>Completed</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Cancelled</option>
        </select>
        <select>
          <option>All Time</option>
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>

      <div className="status-tabs">
        <button
          className={statusFilter === "All" ? "active" : ""}
          onClick={() => setStatusFilter("All")}
        >
          All Orders ({statusCounts.All})
        </button>
        <button
          className={statusFilter === "Processing" ? "active" : ""}
          onClick={() => setStatusFilter("Processing")}
        >
          Processing ({statusCounts.Processing})
        </button>
        <button
          className={statusFilter === "Shipped" ? "active" : ""}
          onClick={() => setStatusFilter("Shipped")}
        >
          Shipped ({statusCounts.Shipped})
        </button>
        <button
          className={statusFilter === "Completed" ? "active" : ""}
          onClick={() => setStatusFilter("Completed")}
        >
          Completed ({statusCounts.Completed})
        </button>
        <button
          className={statusFilter === "Cancelled" ? "active" : ""}
          onClick={() => setStatusFilter("Cancelled")}
        >
          Cancelled ({statusCounts.Cancelled})
        </button>
      </div>

      <div className="orders-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Date</th>
              <th>Status</th>
              <th>Items</th>
              <th>Total ($)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.email}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </td>
                <td>{order.items}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>{order.actions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-row">
        <span> Previous </span>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <span>...</span>
        <span>Next</span>
      </div>
    </div>
  )
}
