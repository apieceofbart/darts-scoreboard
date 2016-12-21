import { connect } from 'react-redux'
import Players from './Players'

const mapStateToProps = state => ({ players: state.players });

const PlayersList = connect(
  mapStateToProps
)(Players)

export default PlayersList
