import {Footer} from "@/app/domain/home/footer";

export default function Layout({children}: { children: React.ReactNode }) {
  return(//todo add border color in settings
      <div className="h-screen border-t-8 border-amber-400 bg-primary overflow-y-scroll">
          {children}
          <Footer/>
      </div>
  );
}