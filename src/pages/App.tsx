import { TopBar } from "@/components/section/app/TopBar";
import Fields  from "@/components/section/app/Fields";



function App() {
  return (
    <>
      <TopBar />
      <main className="flex flex-col items-center justify-around h-screen">
        <Fields />
      </main>
    </>
  );
}

export default App;

