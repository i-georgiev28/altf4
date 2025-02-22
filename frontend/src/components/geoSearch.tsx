import SearchField from '@terrestris/react-geo/dist/Field/SearchField/SearchField';
import {
  createNominatimSearchFunction,
  createNominatimGetValueFunction,
} from '@terrestris/react-util';
import {useMemo} from 'react';

interface GeoSearchProps {
  value?: string;
  onChange?: (value: string) => void;
  [key: string]: any;  // Allow additional props
}

const GeoSearch = ({ value, onChange, ...props }: GeoSearchProps) => {
    const nominatimSearchFunction = useMemo(() => createNominatimSearchFunction({
        searchResultLanguage: 'en',
        countryCodes: 'bg',
        limit: 10
    }), []);
    const nominatimGetValue = useMemo(() => createNominatimGetValueFunction(), []);
  
    return (
          <SearchField
            searchFunction={nominatimSearchFunction}
            getValue={nominatimGetValue}
            // value={value}
            placeholder="Search for any location..."
            className="w-full z-10"
            {...props}
          />
    );
};

export {GeoSearch};