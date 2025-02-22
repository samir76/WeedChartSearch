import { NavLink } from "react-router-dom";
import { IoIosRefreshCircle } from "react-icons/io";


export default function Search({ Searchchange, categories={} }) {
  const handleSearchChange = (event) => {
    const newSearchQuery = event.target.value;
    const [category, ...searchTerm] = newSearchQuery.split(':');
    const trimmedSearchTerm = searchTerm.join(':').trim();

    if (Object.keys(categories).includes(category.trim().toLowerCase())) {
      Searchchange(trimmedSearchTerm, category.trim().toLowerCase());
    } else {
      Searchchange(newSearchQuery);
    }
  };

  return (
    <div class="inputclass">
      <input
        onChange={handleSearchChange}
        className="formsearch" type="text" placeholder="Search by Weed name, type or class ... ">
      </input>
      <NavLink className="searchlink" to="/"><IoIosRefreshCircle/></NavLink>
    </div>
  )
}