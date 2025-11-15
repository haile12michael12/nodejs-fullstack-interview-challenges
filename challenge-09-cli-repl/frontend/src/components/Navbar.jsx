import './Navbar.css'

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="#" onClick={() => window.location.reload()}>Refresh</a></li>
      </ul>
    </nav>
  )
}

export default Navbar