export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 pt-8 pb-10 text-center">
      <p className="text-[12px] text-[#89839c]/60">
        &copy; {currentYear} Quantum Unit Interlock Protocol. All rights reserved.
      </p>
    </footer>
  );
}
