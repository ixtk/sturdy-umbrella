import React from "react"
import "./OrdersPage.scss"
import { useState } from "react"
import ordersData from "@/mock-data/orders.json" //fake mock-data რომელსაც ვიყენებთ ინფორმაციის map-ით გამოსაცენად
import { clsx } from "clsx"
import { Search, Clock, CircleDollarSign, Package2, Truck } from "lucide-react"

export const OrdersPage = () => {
  const [statusFilter, setStatusFilter] = useState("All") // ეს state განსაზღვრავს რომელი ღილაკია მონიშნული

  //! ცხრილის პაგინაციისთვის
  const [currentPage, setCurrentPage] = useState(1) //ეს არის გვერდის ნომერი და თავდაპირველად მომხმარებელი პირველ გვერდზეა
  const ordersPerPage = 10 // როგორც ცვლადის სახელი გვეუბნება, ამ ცვლადით განვსაზღვრავთ რამდენი შეკვეთა გვინდა რომ იყოს თითო გვერდზე

  const filteredData =
    statusFilter === "All"
      ? ordersData
      : ordersData.filter(order => order.status === statusFilter) //statusFilter გვიჩვენებს რომელი ღილაკიცაა მონიშნული, და თუ მონიშნულია "All"
  //ყველა შეკვეთა გამოჩნდება, და თუ სხვა კატეგორიაა მონიშნული მაშინ ვფილტრავთ შეკვეთების სიას რომ გამოვიტანოთ იმ კატეგორიის წარმომადგენელი შეკვეთები.

  const totalPages = Math.ceil(filteredData.length / ordersPerPage) // ეს ფუნქცია ითვლის რამდენი გვერდი უნდა იყოს სულ. მაგალითად თუ გვაქვს 22 შეკვეთა და თითო გვერდზე უნდა იყოს 10 შეკვეთა
  // ანუ გვჭირდება წესით 2.2 გვერდი და Math.ceil მაღალი ციფრისკენ დაამრგვალებს ამ რაოდენობას ამ შემთხვევაში 3-მდე, იმიტორო 2-მდე რომ დაამრგვალოს ორი შეკვეთა ალბათ აღარ გამოჩნდება ან აირევა რამე.

  // indexOfFirstOrder, indexOfLastOrder ეს ორი ცვლადი განსაზღვრავს საიდან სადამდე გვაჩვენოს თითოეულ გვერდზე შეკვეთები
  const indexOfLastOrder = currentPage * ordersPerPage // ბოლო შეკვეთის  ინდექსი იქნება currentPage რომლის საწყისი მნიშვნელობაცაა 1, ანუ პირველ გვერდზე ვართ, გამრავლებული იმ  რაოდენობაზე
  //რამდენი შეკვეთაცაა ამ გვერდზე. დავუსვათ რომ ვიყოთ მესამე გვერდზე ბოლო შეკვეთის ინდექსი იქნებოდა 3*10 ანუ 30.

  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage // პირველ გვერდზე indexOfFirstOrder-ის მნიშვნელობა იქნება 10-10=0 ანუ მასივის პირველი ელემენტიდან დაიწყებს ჩვენებას და ა.შ.
  const currentOrders = filteredData.slice(indexOfFirstOrder, indexOfLastOrder) // აქ კი ვეუბნნებით, რომ filteredData მასივიდან ამოჭრას შეკვეთები indexOfFirstOrder- აქედან , indexOfLastOrder აქამდე

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber) // როდესაც პაგინაციის ღილაკს დავაწვებით, ამ ფუნქციას იძახებს და CurrentPage-ის მნიშვნელობას შეცვლის.
  }
  //!-------------------

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
  const totalRevenue = ordersData.reduce((acc, order) => acc + order.total, 0) //reduce გადააქცევს მასივს ერთ მნიშვნელობად; acc-ს საწყისი მნიშვნელობა არის 0 და ინახავს ახლანდელ მომენტში
  //საბოლოო ფასის რაოდენობას. order არის კონკრეტული შეკვეთის ობიექტი ordersData მასივიდან. და ეს პროცესი ესე მიმდინარეობს რომ თავიდან acc არის 0 და მაგალითად რომელიმე სეკვეთის საფასურია 100
  //acc + order.total იქნება 100, მაგრამ შემდეგი პროდუქტისთვის acc-ს მნიშვნელობა ინება უკვე 100 და მას დაემატება კიდევ სხვა პროდუქტის ფასი.

  // ! status-button-ებისთვის
  const statusButtons = [
    { title: "All", value: "All" },
    { title: "Processing", value: "Processing" },
    { title: "Shipped", value: "Shipped" },
    { title: "Completed", value: "Completed", hideOnSmall: true },
    { title: "Cancelled", value: "Cancelled", hideOnSmall: true }
  ]
  return (
    <div>
      <h1>Order Management</h1>

      <div className="summary-boxes">
        <div className="box total-orders">
          <Package2 className="icon" />
          <div>
            <p>Total Orders</p>
            <h3>{ordersData.length}</h3>
          </div>
        </div>

        <div className="box total-revenue">
          <CircleDollarSign className="icon" />
          <div>
            <p>Total Revenue</p>
            <h3>${totalRevenue.toFixed(2)}</h3>
          </div>
        </div>

        <div className="box processing">
          <Clock className="icon" />
          <div>
            <p>Processing</p>
            <h3>{statusCounts.Processing}</h3>
          </div>
        </div>

        <div className="box shipped">
          <Truck className="icon" />
          <div>
            <p>Shipped</p>
            <h3>{statusCounts.Shipped}</h3>
          </div>
        </div>
      </div>

      <div className="filters-row">
        <div className="search-wrapper">
          <Search />
          <input type="text" placeholder="Search orders..." />
        </div>

        <div className="status-filters">
          {statusButtons.map(button => (
            <button
              key={button.value}
              onClick={() => setStatusFilter(button.value)}
              className={clsx(
                "btn",
                statusFilter === button.value ? "btn btn-outline" : "",
                button.hideOnSmall && "hide-on-small"
              )}
            >
              {button.title}
              <span></span>
            </button>
          ))}
        </div>
      </div>

      <div className="card orders-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.date}</td>
                <td>{order.customer}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>
                  <span
                    className={clsx("badge", {
                      "badge-success": order.status === "Completed",
                      "badge-danger": order.status === "Cancelled",
                      "badge-secondary": order.status === "Processing",
                      "badge-outline": order.status === "Shipped"
                    })}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-icon"
                    style={{ textAlign: "center" }}
                  >
                    ...
                    {/* <Search className="icon" /> */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={clsx(
              "btn",
              currentPage === index + 1 ? "btn-primary" : "btn-outline"
            )}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}
