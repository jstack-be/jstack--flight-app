
export default function Layout({children}: { children: React.ReactNode }) {
  return(
      <div className="overflow-auto h-screen md:flex-row over">
          {children}
      </div>
  );
}