import { connect } from 'react-redux'
import Players from './Players'
import { removePlayer, movePlayerUp, movePlayerDown } from '../../actions'

const mapStateToProps = state => ({ players: state.present.players });

const mapDispatchToProps = dispatch => ({
    onPlayerRemove: id => {
      dispatch(removePlayer(id));
    },
    onPlayerMoveUp: id => {
      dispatch(movePlayerUp(id));
    },
    onPlayerMoveDown: id => {
      dispatch(movePlayerDown(id));
    }
});

const PlayersList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Players)

export default PlayersList
