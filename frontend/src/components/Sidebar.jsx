import React from "react"

const Sidebar = () => (
  <aside className="w-64 p-4 border-r space-y-6">
    <div>
      <h3 className="font-semibold mb-2">Gender</h3>
      {["Men", "Women", "Unisex"].map(option => (
        <div key={option}>
          <input type="checkbox" /> {option}
        </div>
      ))}
    </div>
    <div>
      <h3 className="font-semibold mb-2">Sale & Offers</h3>
      {["On Sale", "Special Offer", "Clearance"].map(option => (
        <div key={option}>
          <input type="checkbox" /> {option}
        </div>
      ))}
    </div>
    <div>
      <h3 className="font-semibold mb-2">Color</h3>
      {["Black", "White", "Navy", "Brown", "Red", "Blue", "Green", "Gray"].map(
        option => (
          <div key={option}>
            <input type="checkbox" /> {option}
          </div>
        )
      )}
    </div>
    <div>
      <h3 className="font-semibold mb-2">Shop by Price</h3>
      {["Under $25", "$25 - $50", "$50 - $100", "$100 - $150", "$150+"].map(
        option => (
          <div key={option}>
            <input type="checkbox" /> {option}
          </div>
        )
      )}
    </div>
    <div>
      <h3 className="font-semibold mb-2">Size</h3>
      {[6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12].map(size => (
        <button key={size} className="border px-2 py-1 m-1">
          {size}
        </button>
      ))}
    </div>
  </aside>
)

export default Sidebar
