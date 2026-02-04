import CardSection from "./components/cardSection/card-section";
import CategoryTab from "./components/categoryTab/category-tab";
import Hero from "./components/hero/hero";
import Navbar from "./components/navBar/nav-bar";
import SearchBar from "./components/searchBar/search-bar";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar />
      <SearchBar />
      <Hero />
      <CategoryTab />
      <CardSection />
    </div>
  );
};

export default Home;
