import { FlatList, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState,useEffect } from 'react'
import Icon from './components/Icon'
import Snackbar from 'react-native-snackbar';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const App = ():JSX.Element => {
  const [isCross,setCross]=useState<boolean>(false);
  const [gameWinner,setGameWinner]=useState<string>('');
  const [gameState,setGameState]=useState(new Array(9).fill('empty',0,9));

  const resetGame=()=>{
    setCross(false);
    setGameWinner('');
    setGameState(new Array(9).fill('empty',0,9))
  }
  const isAllFill=()=>{
    for(let i=0;i<9;i++)
    {
      if(gameState[i]=='empty')return false;
    }
    return true;
  }
  const isGameWinner=()=>{
    if(isAllFill())
    {
      setGameWinner(`The match is draw`);
      return;
    }
    if(gameState[0]==gameState[1] && gameState[0]==gameState[2] && gameState[0]!=='empty')
    {
      setGameWinner(`The winner is ${gameState[0]}`);
    }
    else if(gameState[3]==gameState[4] && gameState[3]==gameState[5] && gameState[3]!=='empty')
    {
      setGameWinner(`The winner is ${gameState[3]}`);
    }
    else if(gameState[6]==gameState[7] && gameState[6]==gameState[8] && gameState[6]!=='empty')
    {
        setGameWinner(`The winner is ${gameState[6]}`);
    }
    else if(gameState[0]==gameState[3] && gameState[0]==gameState[6] && gameState[0]!=='empty')
    {
          setGameWinner(`The winner is ${gameState[0]}`);
    }
    else if(gameState[1]==gameState[4] && gameState[1]==gameState[7] && gameState[1]!=='empty')
    {
          setGameWinner(`The winner is ${gameState[1]}`);
    }
    else if(gameState[2]==gameState[5] && gameState[2]==gameState[8] && gameState[2]!=='empty')
    {
          setGameWinner(`The winner is ${gameState[2]}`);
    }
    else if(gameState[0]==gameState[4] && gameState[0]==gameState[8] && gameState[0]!=='empty')
    {
          setGameWinner(`The winner is ${gameState[0]}`);
    }
    else if(gameState[2]==gameState[4] && gameState[2]==gameState[6] && gameState[2]!=='empty')
    {
            setGameWinner(`The winner is ${gameState[2]}`);
    }
    
  }

  const isItemChange=(itemNumber:number)=>{
    if(gameWinner){
      return Snackbar.show({
        text:gameWinner,
        backgroundColor:'#000000',
        textColor:'#ffffff'
      })
    }

    if(gameState[itemNumber]==='empty')
    {
      const newGameState = [...gameState]; // Create a copy of the current gameState
      newGameState[itemNumber] = isCross ? 'cross' : 'circle'; // Update the specific item
      setGameState(newGameState); // Set the new gameState
        
        
        setCross(!isCross);
      

    }else{
      return Snackbar.show({
        text:'Position is Filled',
        backgroundColor:'red',
        textColor:'#ffffff'
      })
    }
    
    if(gameWinner){
      return Snackbar.show({
        text:gameWinner,
        backgroundColor:'#000000',
        textColor:'#ffffff'
      })
    }

    
  }

  useEffect(() => {
    if (!gameWinner) {
      isGameWinner(); // Check if there's a winner when the gameState changes
    }
  }, [gameState]);

  useEffect(()=>{
    if(gameWinner)
    {
       return Snackbar.show({
        text: gameWinner,
        backgroundColor:'green',
        textColor:'#ffffff'
       })
    }
  },[gameWinner])
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>
      
        {gameWinner ? 
        <View style={[styles.winnerInfo]}>
          <Text>{gameWinner}</Text>
        </View> 
        : (
          <View style={[styles.playerInfo,(isCross?styles.playerX:styles.playerO)]}>
            <Text style={{color:'#000000'}}>
              Player {isCross ? 'X' : 'O'}'s Turn
            </Text>
          </View>
        )}
        <FlatList
        numColumns={3}
        data={gameState}
        style={styles.grid}
        renderItem={({item,index})=>
          (<Pressable 
          key={index}
          style={styles.card}
          onPress={()=>isItemChange(index)}
          >
            <Icon name={item} />
          </Pressable>)
        }
        />
        <Pressable
        onPress={resetGame} 
        style={styles.btn}
        >
          <Text style={{color:'#ffffff'}}>
            {gameWinner ?'Restart the Game':'Reload the game'}
          </Text>
        </Pressable>
     
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center'
  },
  playerInfo:{
    borderRadius: 8,
    
    alignItems:'center',
    justifyContent:'center',
    marginHorizontal:10,
    padding:25,
    marginTop:20,
    //height: 56,
    flexDirection:'row',
    shadowOpacity: 0.1,
  },
  playerX:{
    backgroundColor:'#28fc03'
  },
  playerO:{
    backgroundColor:'#fcba03'
  },
  grid: {
    margin: 12,
    marginHorizontal:'auto',
    marginTop:50
  },
  card: {
    height: 100,
    width: 100,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#000000',
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  btn:{
    alignItems: 'center',

    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF'
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',
    alignItems:'center',
    justifyContent:'center',
    marginHorizontal:10,
    marginTop:20,
    padding:25,
    //height: 56,
    flexDirection:'row',
    shadowOpacity: 0.1,
  },
})