import Link from 'next/link';

export default ({ currentUser }) => {
  return <nav className="navbar navbar-light bg-light">
    <Link legacyBehavior href="/">
      <a className="navbar-brand">GitTix</a>
    </Link>

    <div className='d-flex justify-content-end'>
      <ul className='nav d-flex align-items-center'>
        { currentUser ? 'Sign out' : 'Sign in/up'}
      </ul>
    </div>
  </nav>
}