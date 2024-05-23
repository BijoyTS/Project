import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ImageBackground } from 'react-native';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = () => {
    setIsRegistered(true);
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://www.gettyimages.in/detail/photo/corona-virus-royalty-free-image/1212213054' }} 
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        {!isRegistered ? (
          <View style={styles.formContainer}>
            <Text style={styles.title}>Register</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              placeholderTextColor="gray"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="gray"
            />
            <Button title="Register" onPress={handleRegister} color="dodgerblue" />
          </View>
        ) : (
          <ApiDataScreen />
        )}
      </View>
    </ImageBackground>
  );
};

const ApiDataScreen = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('https://covid-19-statistics.p.rapidapi.com/reports/total', {
        headers: {
          'X-RapidAPI-Key': 'bf106b4057msh27ac626ca168a5dp1b0ca3jsn07d856e11ec5',
          'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
        }
      });
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>COVID-19 Statistics</Text>
      {data ? (
        <ScrollView style={styles.dataContainer}>
          <Text style={styles.dataText}>Date: {data.date}</Text>
          <Text style={styles.dataText}>Last Update: {data.last_update}</Text>
          <Text style={styles.dataText}>Confirmed Cases: {data.confirmed}</Text>
          <Text style={styles.dataText}>Confirmed Diff: {data.confirmed_diff}</Text>
          <Text style={styles.dataText}>Deaths: {data.deaths}</Text>
          <Text style={styles.dataText}>Deaths Diff: {data.deaths_diff}</Text>
          <Text style={styles.dataText}>Recovered: {data.recovered}</Text>
          <Text style={styles.dataText}>Recovered Diff: {data.recovered_diff}</Text>
          <Text style={styles.dataText}>Active Cases: {data.active}</Text>
          <Text style={styles.dataText}>Active Diff: {data.active_diff}</Text>
          <Text style={styles.dataText}>Fatality Rate: {data.fatality_rate}</Text>
        </ScrollView>
      ) : (
        <Text style={styles.loadingText}>Fetching data...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'black', // Dark overlay to improve text readability
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: 'grey',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    marginBottom: 16,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: 'white',
  },
  dataContainer: {
    width: '100%',
    maxWidth: 600,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    marginTop: 20,
  },
  dataText: {
    fontSize: 18,
    marginBottom: 8,
    color: 'black',
    fontWeight: '500',
  },
  loadingText: {
    fontSize: 18,
    color: 'white',
  },
});

export default App;
