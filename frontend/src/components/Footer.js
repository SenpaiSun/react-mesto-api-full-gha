export default function Footer() {
  const year = new Date()

  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; {year.getFullYear()} Mesto Russia</p>
    </footer>
  )
}