
export default function Layout({children}: { children: React.ReactNode }) {
  return(
      <div className="flex h-screen md:flex-row">
          {children}
      </div>
  );
}