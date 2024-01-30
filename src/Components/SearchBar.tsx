import React from 'react';

const SearchBar: React.FC<SearchBarProps> = ({searchTerm, onSearchTermChange}) => {
    return (
        <>
            <div className="mb-5 mb-lg-2 me-lg-3 position-relative">
                <input
                    type="search"
                    className={`form-control ${searchTerm ? 'search-active' : ''}`}
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => onSearchTermChange(e.target.value)}
                    aria-label="Buscar"
                />
                <i className="bi bi-search position-absolute top-50 start-100 translate-middle-y search-icon"></i>
            </div>
        </>
    );
};

export default SearchBar;
