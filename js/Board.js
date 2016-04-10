import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native';

export default class Board extends Component {
  static propTypes = {
    player1: React.PropTypes.object.isRequired,
    player2: React.PropTypes.object.isRequired,
    scorePlayer1: React.PropTypes.func.isRequired,
    scorePlayer2: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      pressAllowed: false,
      player1Scored: false,
      player1Failed: false,
      player2Scored: false,
      player2Failed: false,
    };
  }

  componentDidMount() {
    this.play();
  }

  componentWillUnmount() {
    clearTimeout(this.boardTimer);
    clearTimeout(this.scoreTimer);
  }

  player1PressIn() {
    this.resetScoreFlags();
    if (this.state.pressAllowed) {
      this.props.scorePlayer1();
      this.setState({ player1Scored: true });
    } else {
      this.props.scorePlayer2();
      this.setState({ player1Failed: true });
    }
    this.play();
  }

  player2PressIn() {
    this.resetScoreFlags();
    if (this.state.pressAllowed) {
      this.props.scorePlayer2();
      this.setState({ player2Scored: true });
    } else {
      this.props.scorePlayer1();
      this.setState({ player2Failed: true });
    }
    this.play();
  }

  play() {
    this.forbideToPress();
    clearTimeout(this.boardTimer);
    clearTimeout(this.scoreTimer);
    this.scoreTimer = setTimeout(() => this.resetScoreFlags(), 1000);
    this.boardTimer = setTimeout(() => this.allowToPress(), Math.random() * 5000);
  }

  resetScoreFlags() {
    this.setState({
      player1Scored: false,
      player1Failed: false,
      player2Scored: false,
      player2Failed: false,
    });
  }

  allowToPress() {
    this.setState({ pressAllowed: true });
  }

  forbideToPress() {
    this.setState({ pressAllowed: false });
  }

  render() {
    return (
      <View style={[styles.container, this.state.pressAllowed ? styles.containerPressAllowed : styles.containerPressDisallowed]}>
        <View style={ [ styles.player, styles.player2 ] }>
          <TouchableWithoutFeedback onPressIn={ this.player2PressIn.bind(this) }>
            <View style={ styles.button }>
              <Text style={ [ styles.buttonText, this.state.player2Scored && styles.buttonTextSuccess, this.state.player2Failed && styles.buttonTextFailure ] }>{ this.props.player2.score }</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={ styles.player }>
          <TouchableWithoutFeedback onPressIn={ this.player1PressIn.bind(this) }>
            <View style={ styles.button }>
              <Text style={ [ styles.buttonText, this.state.player1Scored && styles.buttonTextSuccess, this.state.player1Failed && styles.buttonTextFailure ] }>{ this.props.player1.score }</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerPressAllowed: {
    backgroundColor: "#03dd03",
  },
  containerPressDisallowed: {
    backgroundColor: "#da0000",
  },
  player: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  player2: {
    transform: [
      {rotate: "180deg"}
    ]
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 10,
    borderColor: "#000",
    backgroundColor: "#FFF",
    width: 220
  },
  buttonText: {
    textAlign: "center",
    fontSize: 60,
    fontWeight: "bold",
    color: "#000"
  },
  buttonTextSuccess: {
    color: "#03dd03",
  },
  buttonTextFailure: {
    color: "#da0000",
  },
});
