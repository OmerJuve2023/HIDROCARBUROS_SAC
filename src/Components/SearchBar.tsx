import React from 'react';

const SearchBar: React.FC<SearchBarProps> = ({searchTerm, onSearchTermChange}) => {
    return (
        <div className="mb-5 mb-lg-2 me-lg-3">
            <input
                type="search"
                className="form-control"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => onSearchTermChange(e.target.value)}
                aria-label="Buscar"
            />
        </div>
    );
};

export default SearchBar;
