
function EmployeeForm() {
  function handleSubmit(event) {
    event.preventDefault()
    alert('Employee form submitted successfully!')
  }

  return (
    <main className="content">
      <h1>Add Employee</h1>
      <p>Enter the employee details below.</p>

      <form className="employee-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter employee name"
          required
        />

        <label htmlFor="designation">Designation</label>
        <input
          id="designation"
          name="designation"
          type="text"
          placeholder="Enter designation"
          required
        />

        <label htmlFor="location">Location</label>
        <input
          id="location"
          name="location"
          type="text"
          placeholder="Enter location"
          required
        />

        <label htmlFor="salary">Salary</label>
        <input
          id="salary"
          name="salary"
          type="number"
          min="0"
          placeholder="Enter salary"
          required
        />

        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default EmployeeForm
