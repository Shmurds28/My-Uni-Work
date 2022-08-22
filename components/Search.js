import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {InstantSearch, SearchBox, Hits} from 'react-instantsearch-dom';
import Hit from './Hit';

const searchClient = algoliasearch(
  'F1IS3BSDLF',
  '0d790405d16390b0a38d4657c7fb6b72'
);

function Search() {
  return (
   <InstantSearch searchClient={searchClient} indexName={"modules"}>
        {/* <p>Something!</p> */}

        <SearchBox />
        {/* <Hits hitComponent={Hit}/>
         */}

         <Hits />
         {/* <p>dsjgfshjhdfjh</p> */}
         
   </InstantSearch>
  )
}

export default Search
