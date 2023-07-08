import { useState, useEffect, useContext, createContext, Children } from "react";




const SearchContext = createContext();
const SearchProvider = ({ Children }) => {
    const [auth, setAuth] = useState({
        keyword: "",
        results: [],
    })
}



// eslint-disable-next-line

return (
    <SearchContext.Provider value={[auth, setAuth]}>

        {Children}
    </SearchContext.Provider>

)


//custom hook 
const useSearch = () => useContext(SearchContext)

export { useSearch, SearchProvider }