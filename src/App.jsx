
import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom'
import EmployeeForm from './EmployeeForm'
import './App.css'

function Home() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch employees')
        }
        return response.json()
      })
      .then((data) => setEmployees(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  const filteredEmployees = employees.filter((employee) =>
    `${employee.name} ${employee.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <main className="content">
      <section className="welcome-section">
        <p className="eyebrow">EMPLOYEE MANAGEMENT</p>
        <h1>Welcome to your Dashboard 👋</h1>
        <p>Manage your employee information in one place.</p>
      </section>

      <section className="summary-grid">
        <article className="summary-card">
          <div className="summary-icon purple">👥</div>
          <div>
            <p>Total Employees</p>
            <h2>{loading ? '—' : error ? '—' : employees.length}</h2>
          </div>
        </article>

        <article className="summary-card">
          <div className="summary-icon blue">📋</div>
          <div>
            <p>Employee Records</p>
            <h2>{loading ? '—' : error ? '—' : employees.length}</h2>
          </div>
        </article>

        <article className="summary-card">
          <div className="summary-icon green">🔎</div>
          <div>
            <p>Search Results</p>
            <h2>
              {loading || error ? '—' : filteredEmployees.length}
            </h2>
          </div>
        </article>
      </section>

      <section className="employee-section">
        <div className="section-heading">
          <div>
            <h2>Employee List</h2>
            <p>Employee information fetched from the API.</p>
          </div>

          <input
            className="search-input"
            type="search"
            placeholder="Search name or email..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search employees by name or email"
          />
        </div>

        {loading ? (
          <p className="status-message">Loading employees...</p>
        ) : error ? (
          <p className="status-message">
            Unable to load employees. Please refresh the page.
          </p>
        ) : filteredEmployees.length === 0 ? (
          <p className="status-message">
            No employees match your search.
          </p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>
                      <div className="employee-name">
                        <span className="avatar">
                          {employee.name.charAt(0).toUpperCase()}
                        </span>
                        {employee.name}
                      </div>
                    </td>
                    <td>{employee.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}

function App() {
  const location = useLocation()

  return (
    <>
      <header className="navbar">
        <Link className="brand" to="/">
          <span className="brand-icon">✦</span>
          <span>Employee Dashboard</span>
        </Link>

        <nav>
          <Link
            className={location.pathname === '/' ? 'active' : ''}
            to="/"
          >
            Home
          </Link>
          <Link
            className={
              location.pathname === '/employee-form' ? 'active' : ''
            }
            to="/employee-form"
          >
            + Add Employee
          </Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee-form" element={<EmployeeForm />} />
      </Routes>

      <footer className="footer">
        Employee Dashboard · Built with React
      </footer>
    </>
  )
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
