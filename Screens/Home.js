import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
export default class Home extends React.Component {
  render() {
    let photo = this.props.route.params?.photo;

    return (
      <View style={styles.container}>
        <Image
          resizeMode="center"
          style={styles.imageHolder}
          source={photo === "empty" ? require("../assets/profile.png") : photo}
        />
        <Button
          title="Take Photo"
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("CameraScreen", {
              photo: this.props.route.params?.photo,
            });
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageHolder: {
    alignSelf: "center",
    height: 500,
    margin: 20,
  },
  button: {
    margin: 20,
    height: 20,
  },
});
