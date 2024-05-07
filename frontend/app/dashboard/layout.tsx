
export default function Layout({children}: { children: React.ReactNode }) {
  return(
      <div className="flex-grow h-screen md:flex-row">
          {children}
      </div>
  );
}