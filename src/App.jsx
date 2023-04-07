import { useState } from "react";
import Playground from "./containers/Playground";
import Sidebar from "./containers/Sidebar";
import Toolbar from "./containers/Toolbar";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSidebarOpen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col overflow-x-hidden font-inter">
      <Toolbar handleSideBarOpen={handleSidebarOpen} />
      <div className="flex h-full flex-row overflow-x-hidden">
        <Playground />
        <Sidebar isShowing={sidebarOpen} />
      </div>
    </div>
  );
}

export default App;
