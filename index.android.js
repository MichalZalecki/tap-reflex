import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  BackAndroid
} from 'react-native';

import Home from "./js/Home";
import Board from "./js/Board";

class TapReflex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "home",
      player1: {
        score: 0,
      },
      player2: {
        score: 0,
      }
    };
  }

  componentDidMount() {
    BackAndroid.addEventListener("hardwareBackPress", () => {
      if (this.refs.navigator.getCurrentRoutes().length === 1  ) {
         return false;
      }
      this.refs.navigator.pop();
      return true;
    });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener("hardwareBackPress");
  }

  onStartGame() {
    this.reset();
    this.refs.navigator.push({ id: "board" });
  }

  scorePlayer1() {
    const player1 = this.state.player1;
    this.setState({ player1: { ...player1, score: player1.score + 1 } });
  }

  scorePlayer2() {
    const player2 = this.state.player2;
    this.setState({ player2: { ...player2, score: player2.score + 1 } });
  }

  reset() {
    this.setState({
      player1: {
        score: 0,
      },
      player2: {
        score: 0,
      }
    });
  }

  renderScene(route, nav) {
    switch (route.id) {
      case "board":
        return (
          <Board
            player1={ this.state.player1 }
            player2={ this.state.player2 }
            scorePlayer1={ this.scorePlayer1.bind(this) }
            scorePlayer2={ this.scorePlayer2.bind(this) }
          />
        );
      default:
        return (
          <Home
            onStart={ this.onStartGame.bind(this) }
          />
        );
    }
  }

  render() {
    return (
      <Navigator
        ref="navigator"
        style={ styles.container }
        initialRoute={{ id: "home" }}
        renderScene={ this.renderScene.bind(this) }
      />
    );
  }
}

{/*<View style={ styles.container }>
{ this.state.display === "home" &&
<Home
onStart={ this.onStartGame.bind(this) }
/> }
{ this.state.display === "board" &&
<Board
player1={ this.state.player1 }
player2={ this.state.player2 }
scorePlayer1={ this.scorePlayer1.bind(this) }
scorePlayer2={ this.scorePlayer2.bind(this) }
/> }
</View>*/}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('TapReflex', () => TapReflex);
