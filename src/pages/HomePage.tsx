import FlightSearch from "../components/FlightSearch.tsx";

const HomePage = () => {
  return (
    <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden  ">
      <img
        src="/homebg.jpeg"
        alt="FLIGHT ANALYTICS"
        className="absolute inset-0 w-full h-screen object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10 rounded-2xl"/>

      <div className="relative z-10 flex flex-col md:items-center mt-5 h-full text-white px-4">
        <h1 className="text-3xl md:text-5xl font-semibold">
          <span className="text-yellow-400"> SKYLOFT</span>
        </h1>
        <p className="text-lg md:text-xl mt-2 tracking-wide mb-10">
          SELECT RIGHT FLIGHT FOR YOUR NEXT DESTINATION
        </p>

        <FlightSearch/>

      </div>
    </div>
  );
};

export default HomePage;