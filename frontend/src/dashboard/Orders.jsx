import React from "react"
import "./Orders.scss"
import { useState, useEffect } from "react"
import ordersData from "../data/data.json" //fake data რომელსაც ვიყენებთ ინფორმაციის map-ით გამოსაცენად
import { FaBox, FaDollarSign, FaClock, FaTruck } from "react-icons/fa" // react-ის iconeb-ი
import { FiSearch } from "react-icons/fi" // ესეც icon

export const Orders = () => {
  const [statusFilter, setStatusFilter] = useState("All") // ეს state განსაზღვრავს რომელი ღილაკია მონიშნული
  const [filteredOrders, setFilteredOrders] = useState([]) // ეს state არის სია იმ შეკვეთებისა, რომელიც შეესაბამება მონიშნულ ღილაკს

  useEffect(() => {
    // useEffect ეშვება ყოველჯერზე როდესაც statusFilter იცვლება
    if (statusFilter === "All") {
      //თუ მონიშნულია "ყველა" ღილაკი აი იმ გაფილტრული შეკვეთების სიას მთლიანი ordersData გადაეცემა მნიშვნელობად
      setFilteredOrders(ordersData)
    } else {
      setFilteredOrders(
        ordersData.filter(order => order.status === statusFilter) // აქ filter-ი ordersData-ს თითოეულ შეკვეთაში ატარებს ამ პირობას : order.status === statusFilter. ამოწმებს თუ ემთხვევა
        //შეკვეთის სტატუსი statusFilter-ს (მონიშნული რაც გვაქვს) და თუ ემთხვევა ისინი ინახება ახალ მასივში რომელიც არის მეორე სთეითი filteredOrders
      )
    }
  }, [statusFilter])

  const statusCounts = {
    // ეს ობიექტი ითვლის თითოეული კატეგორიის შეკვეთების რაოდენობას
    All: ordersData.length,
    Processing: ordersData.filter(order => order.status === "Processing")
      .length, // იგივენაირად როგორც useEffect-ში ვამოწმებთ სტატუსს, ოღონდ ამ შემთხვევაში კონკრეტულ სტატუსს ვადარებთ
    //რომელი შეკვეთის სტატუსიც დაემთხვევა, ამ შემთხვევაში "Processing"-ს , ის შევა მასივში, რომელსაც filter დაგვიბრუნებს და ამ მასივში შემავალი შეკვეთების რაოდენობა იქნება : ეს მასივი..length
    //ანუ გამოვიდა, რომ Processing:- გასაღების მნიშვნელობა ამ ობიექტში იქნება რიცხვი, რაოდენობა იმ შეკვეთებისა, რომელიც მიეკუთვნება კონკრეტულ კატეგორიას.
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
          className={statusFilter === "All" ? "active" : ""} // ვანიჭებთ კლასის სახელს, რომ თუ მისი სტატუსი იქნება all , მაშინ მიენიჭოს კლასი active,
          //რასაც css-ში ვიყენებთ მონიშნული ღილაკისთვის განსხვავებული ფონის მისანიჭებლად
          onClick={() => setStatusFilter("All")} // ღილაკზე დაჭერისას სტატუსს ვანახლებთ, უხდება მითიტებული სტატუსი რაც შემდეგ შეასრულებს 96 ხაზზე დაწერილ პირობას
        >
          All Orders ({statusCounts.All}){" "}
          {/* გამოგვაქვს რაოდენობა იმ კატეგორიის შეკვეთებისა რომელსაც ხელი დავაჭირეთ*/}
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
                  {" "}
                  {/* order.status შეიძლება იყოს "Completed", "Processing","Cancelled"... და ამ სტატუსის სახელს ყველას პატარა ასოებად 
                გადააქცევს -toLowerCase , რაც საშუალებას გვაძლევს სხვადასხვა სტატუსის ღილაკებს სხვადასხვა კლასი მივანიჭოთ, შესაბამისად სხვადასხვა დიზაინი */}
                  {order.status}
                </td>
                <td>{order.items}</td>
                <td>${order.total.toFixed(2)}</td>{" "}
                {/* საბოლოო თანხა თუ არამთელი რიცხვი იქნება , ისეთი რომელსაც მძიმის მერე 2 ზე მეტი ციფრი აქვს ეს ფუნქცია 2 ციფრამდე მიყვანს  */}
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
