import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";

// WebView console.log injection
const debugging = `
     // Debug
     console = new Object();
     console.log = function(log) {
       window.webViewBridge.send("console", log);
     };
     console.debug = console.log;
     console.info = console.log;
     console.warn = console.log;
     console.error = console.log;
     `;

export default function App() {
  const [uri, setUri] = useState("");
  const uriRef = useRef("");
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView />
      <View style={styles.uriInputArea}>
        <Text>URL</Text>
        <View style={{ flex: 1 }}>
          <TextInput
            onChangeText={(text) => (uriRef.current = text)}
            style={styles.textInput}
          />
        </View>
        <Button title="GO!" onPress={() => setUri(uriRef.current)} />
      </View>
      {uri && (
        <WebView
          source={{ uri }}
          style={{ flex: 1 }}
          injectedJavaScript={debugging}
          onMessage={(event: WebViewMessageEvent) =>
            console.log(event.nativeEvent.data)
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  uriInputArea: { flexDirection: "row", alignItems: "center", padding: 10 },
  textInput: {
    backgroundColor: "#33333333",
    margin: 10,
    borderWidth: 0.5,
    borderColor: "black",
    padding: 5,
    borderRadius: 5,
  },
});
