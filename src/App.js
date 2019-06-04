import React from 'react';
import { Grommet, Box, TextInput, Button, Distribution, Text, Table, TableRow, TableHeader, TableCell, TableBody, Image } from 'grommet';
import axios from 'axios';
import MainContainer from './Components/MainContainer';
import RecipeReviewCard from './Components/RecipeReviewCard';
import ClipLoader from 'react-spinners/HashLoader'

const fetchTokopedia = async (product) => {
  const result = await fetch('https://tokolapak-api.titusefferian.now.sh/?products=' + product)
  const parse = await result.json()
  return parse
}

function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x))
      x = x.replace(pattern, "$1,$2");
  return x;
}

const numberDivider = (x) => {
  x = x.toString()
  let pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x))
    x = x.replace(pattern, "$1.$2");
  return x;
}

function App() {
  const [text, setText] = React.useState('')
  const [result, setResult] = React.useState('')
  const [loading, setLoading] = React.useState(false);
  console.log(result);
  return (
    <>
      <Box pad="medium" direction="row" align="center" background="dark-2">
        <TextInput
          plain
          placeholder="Search your product wishlist . . . "
          size="small"
          value={text}
          onChange={event => setText(event.target.value)}
          onKeyDown={async (e) => {
            if (e.key === 'Enter') {
              setLoading(true)
              const result = await fetchTokopedia(text)
              setResult(result)
              setLoading(false)
            }
          }}
        />
        <Button label="search" margin={{ left: '16px' }}
          primary
          onClick={async () => {
            setLoading(true)
            const result = await fetchTokopedia(text)
            setResult(result)
            setLoading(false)
          }} />
      </Box>

      {
        loading ? <div style={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}><ClipLoader/></div>: 
        <MainContainer>
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          {
            result && result.resultTokopedia.data.searchProduct.products.map(x=>(
              <RecipeReviewCard name={x.name} image={x.imageUrl} price={x.price} from="Tokopedia"/>
            ))
          }
        </div>
        <div style={{
          flex: 1,
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
        }}>
          {
            result && result.resultBukalapak.products.map(x=>(
              <RecipeReviewCard name={x.name} image={x.small_images[0]} price={'Rp '+numberDivider(x.price)} from="Bukalapak"/>
            ))
          }
        </div>

      </MainContainer>
      }
      
    </>
  );
}

export default App;
