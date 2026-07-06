import React, { useState } from 'react';
import { Sun, Moon, Search, Car, Fuel, Gauge, Sliders, Star, ChevronRight, X } from 'lucide-react';
import './Home.css';
import Payment from './Payment';


const CAR_DATABASE = [
  { id: 1, name: "Tesla Model S Plaid", price: 114990, rawPrice: "$114,990", type: "Electric", transmission: "Auto", performance: "396 mi range", tag: "Trending", rating: 4.9, img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=600&q=80", desc: "Tri-motor configuration delivering unprecedented raw track acceleration alongside cutting edge autopilot matrices." },
  { id: 2, name: "Porsche 911 Carrera", price: 106100, rawPrice: "$106,100", type: "Petrol", transmission: "Manual", performance: "24 mpg Highway", tag: "Luxury", rating: 4.8, img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80", desc: "The timeless epitome of sports car precision handling, mechanical analog harmony, and supreme twin-turbo flat-six lineage." },
  { id: 3, name: "BMW M4 Competition", price: 78100, rawPrice: "$78,100", type: "Petrol", transmission: "Auto", performance: "23 mpg Highway", tag: "Trending", rating: 4.7, img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80", desc: "Track performance optimized coupe engineering paired with high structural chassis rigidity and customizable drive intelligence profiles." },
   { id: 4, name: "Audi RS e-tron GT", price: 147100, rawPrice: "$147,100", type: "Electric", transmission: "Auto", performance: "232 mi range", tag: "Luxury", rating: 4.9, img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80", desc: "800V high-power charging platform engineered with progressive electric quattro drivetrain distribution mechanics." },
  { id: 4, name: "Audi RS e-tron GT", price: 147100, rawPrice: "$147,100", type: "Electric", transmission: "Auto", performance: "232 mi range", tag: "Luxury", rating: 4.9, img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80", desc: "800V high-power charging platform engineered with progressive electric quattro drivetrain distribution mechanics." }
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [searchStr, setSearchStr] = useState("");
  const [maxBudget, setMaxBudget] = useState("all");
  const [fuelType, setFuelType] = useState("all");
  const [activeTab, setActiveTab] = useState("All");
  const [comparisonArray, setComparisonArray] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
const [activeModalCar, setActiveModalCar] = useState(null);
const [showPayment, setShowPayment] = useState(false);
const [paymentCar, setPaymentCar] = useState(null);
  

  const filteredCars = CAR_DATABASE.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchStr.toLowerCase().trim());
    const matchesBudget = maxBudget === 'all' || car.price <= parseInt(maxBudget);
    const matchesFuel = fuelType === 'all' || car.type === fuelType;
    const matchesTab = activeTab === 'All' || car.tag === activeTab;
    return matchesSearch && matchesBudget && matchesFuel && matchesTab;
  });


  const handleComparisonToggle = (id) => {
    if (comparisonArray.includes(id)) {
      setComparisonArray(comparisonArray.filter(item => item !== id));
    } else {
      if (comparisonArray.length >= 3) {
        alert("Maximum limit reached. You can compare up to 3 models simultaneously.");
        return;
      }
      setComparisonArray([...comparisonArray, id]);
    }
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-theme' : ''}`}>
      
      <nav className="navbar">
        <div className="nav-brand" onClick={() => { setSearchStr(""); setMaxBudget("all"); setFuelType("all"); setActiveTab("All"); }}>
          <div className="brand-icon"><Car size={24} /></div>
          <span>Car<span className="brand-red">Dekho</span></span>
        </div>
        <ul className="nav-links">
          <li><a href="#" className="active">New Cars</a></li>
          <li><a href="#">Used Cars</a></li>
          <li>
            <a href="#">Compare {comparisonArray.length > 0 && <span className="compare-badge">{comparisonArray.length}</span>}</a>
          </li>
        </ul>
        <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle" aria-label="Toggle Theme">
          {darkMode ? <Sun size={20} className="sun-icon" /> : <Moon size={20} />}
        </button>
      </nav>


      <header className="hero">
        <h1 className="hero-title">Find Your <span>Perfect Drive</span></h1>
        <p className="hero-subtitle">Explore and process premium automobiles using multi-criteria live parameters, direct evaluation metrics, and dark aesthetics.</p>
        

        <div className="filter-panel">
          <div className="input-field">
            <label>Search Vehicle</label>
            <div className="input-with-icon">
              <Search size={16} className="search-field-icon" />
              <input type="text" placeholder="Brand, model e.g. Porsche..." value={searchStr} onChange={(e) => setSearchStr(e.target.value)} />
            </div>
          </div>
          <div className="filter-divider"></div>
          <div className="input-field">
            <label>Max Budget</label>
            <select  value={maxBudget} onChange={(e) => setMaxBudget(e.target.value)}>
              <option className='budget' value="all">Any Price</option>
              <option className='budget' value="80000">Under $80,000</option>
              <option className='budget' value="120000">Under $120,000</option>
              <option className='budget' value="150000">Under $150,000</option>
            </select>
          </div>
          <div className="filter-divider"></div>
          <div className="input-field">
            <label>Fuel Framework</label>
            <select value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
              <option className='budget'  value="all">All Propulsions</option>
              <option className='budget'  value="Petrol">Petrol / ICE</option>
              <option className='budget'  value="Electric">Electric / EV</option>
            </select>
          </div>
        </div>
      </header>

      <main className="main-container">
        <div className="tab-bar">
          <div className="pill-group">
            {["All", "Trending", "Luxury"].map((tab) => (
              <button key={tab} className={`pill-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                {tab === "All" ? "All Inventory" : tab}
              </button>
            ))}
          </div>
          <div className="results-count">Showing <span>{filteredCars.length}</span> vehicles match</div>
        </div>

        {filteredCars.length > 0 ? (
          <div className="cars-grid">
            {filteredCars.map((car) => {
              const isComparing = comparisonArray.includes(car.id);
              return (
                <div key={car.id} className="car-card">
                  <div className="card-img">
                    <img src={car.img} alt={car.name} />
                    <span className="tag-badge">{car.tag}</span>
                    <div className="rating-badge"><Star size={12} fill="currentColor" /> {car.rating}</div>
                  </div>
                  <div className="card-content">
                    <h3 className="car-title">{car.name}</h3>
                    <p className="car-price">{car.rawPrice}</p>
                    <div className="specs-strip">
                      <div className="spec-item"><Fuel size={14} /> <strong>{car.type}</strong></div>
                      <div className="spec-item"><Sliders size={14} /> <strong>{car.transmission}</strong></div>
                      <div className="spec-item"><Gauge size={14} /> <strong>{car.performance}</strong></div>
                    </div>
                    <div className="card-actions">
                      <button className="btn btn-view" onClick={() => setActiveModalCar(car)}>Specs Sheet</button>
                      <div className="payment-section">
                         <button
                              className="buy-btn"
                              onClick={() => { setPaymentCar(car); setShowPayment(true);}} >
                               Buy Now
                         </button>
                        
                         
                        
                      </div>
                      <button className={`btn btn-compare ${isComparing ? 'checked' : ''}`} onClick={() => handleComparisonToggle(car.id)}>
                        {isComparing ? '✓ Added' : 'Compare'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <Car size={48} className="empty-icon" />
            <h3>No Matching Models on Grid</h3>
            <p>Optimize your query variables or lift price restrictions to locate options.</p>
          </div>
        )}
      </main>


      {activeModalCar && !showPayment && (
        <div className="modal-overlay active" onClick={() => setActiveModalCar(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveModalCar(null)}><X size={20} /></button>
            <div className="modal-body">
              <h2>{activeModalCar.name}</h2>
              <p className="modal-price">{activeModalCar.rawPrice}</p>
              <img src={activeModalCar.img} alt={activeModalCar.name} />
              <p className="modal-desc">{activeModalCar.desc}</p>
              <div className="specs-strip modal-strip">
                <div className="spec-item"><strong>{activeModalCar.type}</strong>Engine Configuration</div>
                <div className="spec-item"><strong>{activeModalCar.transmission}</strong>Gearbox Variant</div>
                <div className="spec-item"><strong>{activeModalCar.performance}</strong>Operating Efficiency</div>
              </div>
            </div>
          </div>
        </div>
      )}
         <Payment
        showPayment={showPayment}
        setShowPayment={setShowPayment}
        activeModalCar={paymentCar}
      />


      <footer className="footer">
        <p>© 2026 CarDekho Architecture. Built natively with structured React states & CSS custom hooks.</p>
      </footer>
    </div>
  );
}