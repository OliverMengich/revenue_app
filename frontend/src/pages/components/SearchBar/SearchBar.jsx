import React,{useState} from 'react';
import './SearchBar.css';

const SearchBar= (props)=>{
    const [searchValue, setsearchValue] = useState('');
    const handleChange=event=>{
        setsearchValue(event.target.value);
        props.searchUser(event.target.value);
    }
    return(
        <div className='searchbar'>
            <input type='number' value={searchValue} placeholder="Search transaction by user ID number" onChange={handleChange}/>
        </div>
    )
}
export default SearchBar