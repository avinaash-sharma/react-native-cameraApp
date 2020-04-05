import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { FontAwesome } from "@expo/vector-icons";

export default class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      type: Camera.Constants.Type.back,
      isFlashLightOn: Camera.Constants.FlashMode.off,
    };
  }
  //ask camera Permisions
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasPermission: status === "granted",
    });
  }
  //flip the camera
  flipCamera = () => {
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    });
  };

  //flashLight

  flashLight = () => {
    this.setState({
      isFlashLightOn:
      this.state.isFlashLightOn === Camera.Constants.FlashMode.off
          ? Camera.Constants.FlashMode.on
          : Camera.Constants.FlashMode.off,
    });
  };

  //take pitcher and send to homeScreen

  takePitcher = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      this.props.navigation.navigate("Home", { photo: photo });
    }
  };

  render() {
    const { hasPermission } = this.state;
    if (hasPermission === null) {
      return (
        <View style={styles.noAccess}>
          <Text>Testing</Text>
        </View>
      );
    } else if (hasPermission === false) {
      return (
        <View style={styles.noAccess}>
          <Text>No Access to Camera</Text>
        </View>
      );
    } else if (hasPermission === true) {
      return (
        <View style={styles.container}>
          <Camera
            style={styles.cameraView}
            type={this.state.type}
            flashMode={this.state.isFlashLightOn}
            ref={(ref) => {
              this.camera = ref;
            }}
          >
            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={styles.iconHolder}
                onPress={() => this.flipCamera()}
              >
                <FontAwesome name="camera" size={35} style={styles} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconHolder}
                onPress={() => this.takePitcher()}
              >
                <FontAwesome name="circle" size={35} style={styles} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconHolder}
                onPress={() => this.flashLight()}
              >
                <FontAwesome name="flash" size={35} style={styles} />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noAccess: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  cameraView: {
    flex: 1,
  },
  actionContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  iconHolder: {
    flex: 1,
    alignItems: "center",
    alignSelf: "flex-end",
  },
  icon: {
    marginBottom: 10,
    color: "#fff",
  },
});
