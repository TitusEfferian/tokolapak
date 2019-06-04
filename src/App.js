import React from 'react';
import { Grommet, Box, TextInput, Button, Distribution, Text, Table, TableRow, TableHeader, TableCell, TableBody, Image } from 'grommet';
import axios from 'axios';
import MainContainer from './Components/MainContainer';

const fetchTokopedia = async (product) => {
  const result = await fetch('https://tokolapak-api.titusefferian.now.sh/?products=' + product)
  const parse = await result.json()
  return parse
}

function App() {
  const [text, setText] = React.useState('')
  const [result, setResult] = React.useState('')

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
              const result = await fetchTokopedia(text)
              setResult(result)
            }
          }}
        />
        <Button label="search" margin={{ left: '16px' }}
          primary
          onClick={async () => {
            const result = await fetchTokopedia(text)
            setResult(result)
          }} />
      </Box>

      <MainContainer>
        <div style={{
          flex: 1,
          backgroundColor: 'blue',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          {
            [1, 2, 3, 4, 5, 5, 6].map(x => (
              <div style={{ width: 180, height: 200, backgroundColor: 'red', marginBottom: 16 }}></div>
            ))
          }
        </div>
        <div style={{
          flex: 1,
          backgroundColor: 'green',
        }}>
          {
            [1, 2, 3, 4, 5, 5, 6].map(x => (
              <div style={{ width: 180, height: 200, backgroundColor: 'red', marginBottom: 16 }}></div>
            ))
          }
        </div>

      </MainContainer>
    </>
  );
}

export default App;
