
export default function Layout({children}: { children: React.ReactNode }) {
  return(
      <div className=" min-h-screen md:flex-row">
          {children}
      </div>
  );
}