import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, X } from "lucide-react";

// Mock API function to fetch search items
const fetchSearchItems = async (query) => {
  // Mock data
  const items = [
    "Song 1",
    "Song 2",
    "Artist 1",
    "Artist 2",
    "Album 1",
    "Album 2",
  ];

  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(items.filter((item) => item.toLowerCase().includes(query.toLowerCase())));
    }, 300);
  });
};

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query) {
        const results = await fetchSearchItems(query);
        setSuggestions(results);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery("");
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="pr-10"
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
        onClick={handleClear}
      >
        {query ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
      </Button>
      {showSuggestions && (
        <Popover>
          <PopoverTrigger asChild>
            <div className="absolute left-0 right-0 mt-2 bg-white border rounded shadow-lg">
              <PopoverContent>
                {suggestions.length > 0 ? (
                  suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">No results found</div>
                )}
              </PopoverContent>
            </div>
          </PopoverTrigger>
        </Popover>
      )}
    </div>
  );
};

export default SearchBar;