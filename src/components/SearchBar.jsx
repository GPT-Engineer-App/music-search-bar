import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, X } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      // Mock suggestions for demonstration
      setSuggestions(["Suggestion 1", "Suggestion 2", "Suggestion 3"]);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
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
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </PopoverContent>
            </div>
          </PopoverTrigger>
        </Popover>
      )}
    </div>
  );
};

export default SearchBar;