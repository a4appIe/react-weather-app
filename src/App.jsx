import Weather from "./components/Weather";

function App() {
  return (
    <div className="h-screen w-full bg-[#17181E] flex items-center justify-center flex-col">
      <h1 className="text-4xl text-center font-semibold py-5 text-gray-300">
        Weather today'
      </h1>
      <Weather />
    </div>
  );
}

export default App;
