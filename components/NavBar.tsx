import Link from "next/link";

function Navbar() {
  return (
    <nav className="max-w-5xl mx-auto py-4 flex gap-x-4 ">
      <Link href="/">Home</Link>

      <Link href="/todo">Todo</Link>
      <Link href="/sharing">View Shared List</Link>
    </nav>
  );
}
export default Navbar;
