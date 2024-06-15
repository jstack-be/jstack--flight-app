import {Footer} from "@/app/domain/home/footer";

export default function Layout({children}: { children: React.ReactNode }) {
  return(//todo add border color in settings
      <div className="h-full bg-primary overflow-y-scroll">
          {children}
          <Footer/>
      </div>
  );
}