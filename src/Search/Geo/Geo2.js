import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Geo2() {

    const [ users, setUsers ] = useState([]);
    const [ text, setText ] = useState('');
    const [ suggestions, setsuggestions ] = useState([])

    useEffect(() => {
        const loadUsers = async() => {
          const response = await axios.get('http://184.168.117.236/test/admin/api_symptom.php')
          
          setUsers(response.data)
        }
        loadUsers()
      },[])

    const onSuggestHandler = (text) => {
      setText(text)
    }
    const onHandleChange = (text) => {
      let matches = []
      if(text.length > 0) {
        matches = users.filter(user => {
          const regex = new RegExp(`${text}`, "gi");
          return user.treatment_name.match(regex)
        })
      }
      console.log('matches', matches)
      setsuggestions(matches)
      setText(text)
    }
    
    return (
        <div>
            <input 
            type="text" 
            onChange={e => onHandleChange(e.target.value)} 
            placeholder='Search Symptoms'
            value={text}/>
      {suggestions && suggestions.map((suggestion, item) => {
        return(
         <div 
         key={item}
         onClick={() => onSuggestHandler(suggestion.treatment_name)}>{suggestion.treatment_name}</div>
        )
      })}
        </div>
    )
}

export default Geo2
