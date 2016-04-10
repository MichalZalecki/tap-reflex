import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class Home extends Component {
  static propTypes = {
    onStart: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <View style={ styles.container }>
        <View style={ { flex: 1, justifyContent: "center" } }>
          <Text style={ styles.title }>TapReflex</Text>
        </View>
        <View style={ { flex: 1, justifyContent: "center", alignItems: "center" } }>
          <TouchableOpacity activeOpacity={0.5} onPress={this.props.onStart} >
            <View style={ styles.button }>
              <Text style={ styles.buttonText }>Start</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 60,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000"
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
});
