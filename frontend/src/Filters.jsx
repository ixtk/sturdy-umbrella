import "./Filters.scss"

function App() {
    return (
        <aside className="filter-sidebar">
      {/* Gender Section */}
      <div className="filter-group">
        <h3>Gender</h3>
        <label>
          <span>
            <input type="checkbox" />
            Men
          </span>
          <span>(142)</span>
        </label>
        <label>
          <span>
            <input type="checkbox" />
            Women
          </span>
          <span>(156)</span>
        </label>
        <label>
          <span>
            <input type="checkbox" />
            Unisex
          </span>
          <span>(24)</span>
        </label>
      </div>

      {/* Sale & Offers Section */}
      <div className="filter-group">
        <h3>Sale & Offers</h3>
        <label>
          <span>
            <input type="checkbox" />
            On Sale
          </span>
          <span>(36)</span>
        </label>
        <label>
          <span>
            <input type="checkbox" />
            Special Offer
          </span>
          <span>(12)</span>
        </label>
        <label>
          <span>
            <input type="checkbox" />
            Clearance
          </span>
          <span>(8)</span>
        </label>
      </div>

      {/* Color Section */}
      <div className="filter-group color-group">
        <h3>Color</h3>
        <label>
          <span>
            <span className="color-dot black"></span>
            Black
          </span>
          <span>(45)</span>
        </label>
        <label>
          <span>
            <span className="color-dot white"></span>
            White
          </span>
          <span>(32)</span>
        </label>
        <label>
          <span>
            <span className="color-dot navy"></span>
            Navy
          </span>
          <span>(28)</span>
        </label>
        <label>
          <span>
            <span className="color-dot brown"></span>
            Brown
          </span>
          <span>(24)</span>
        </label>
        <label>
          <span>
            <span className="color-dot red"></span>
            Red
          </span>
          <span>(18)</span>
        </label>
        <label>
          <span>
            <span className="color-dot blue"></span>
            Blue
          </span>
          <span>(22)</span>
        </label>
        <label>
          <span>
            <span className="color-dot green"></span>
            Green
          </span>
          <span>(16)</span>
        </label>
        <label>
          <span>
            <span className="color-dot gray"></span>
            Gray
          </span>
          <span>(20)</span>
        </label>
      </div>

      {/* Shop by Price Section */}
      <div className="filter-group">
        <h3>Shop by Price</h3>
        <label>
          <span>
            <input type="checkbox" />
            Under $25
          </span>
          <span>(5)</span>
        </label>
        <label>
          <span>
            <input type="checkbox" />
            $25 - $50
          </span>
          <span>(28)</span>
        </label>
        <label>
          <span>
            <input type="checkbox" />
            $50 - $100
          </span>
          <span>(42)</span>
        </label>
        <label>
          <span>
            <input type="checkbox" />
            $100 - $150
          </span>
          <span>(36)</span>
        </label>
        <label>
          <span>
            <input type="checkbox" />
            $150+
          </span>
          <span>(12)</span>
        </label>
      </div>

      {/* Size Section */}
      <div className="filter-group">
        <h3>Size</h3>
        <div className="size-grid">
          <button>6</button>
          <button>6.5</button>
          <button>7</button>
          <button>7.5</button>
          <button>8</button>
          <button>8.5</button>
          <button>9</button>
          <button>9.5</button>
          <button>10</button>
          <button>10.5</button>
          <button>11</button>
          <button>11.5</button>
          <button>12</button>
        </div>
      </div>
    </aside>
    );
}

export default App