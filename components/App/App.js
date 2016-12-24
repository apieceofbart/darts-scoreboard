import React from 'react'
import AddPlayer from '../AddPlayer'
import PlayersList from '../Players/PlayersList'
import ScoreTable from '../ScoreTable/ScoreTable'
import { Link } from 'react-router'
import './App.less'

const App = ({params}) => {
  const template = params.stage ?
  (
    <div>
      <ScoreTable />
    </div>
  ) :
  (
    <div>
      <AddPlayer />
      <PlayersList />
      <Link to="game" >
        <button>Start game</button>
      </Link>
    </div>
  );

  return template;
}

export default App
