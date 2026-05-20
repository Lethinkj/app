import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');

  const bmiResult = useMemo(() => {
    const h = parseFloat(heightCm);
    const w = parseFloat(weightKg);
    if (!h || !w) return null;
    const heightM = h / 100;
    const bmi = w / (heightM * heightM);
    let label = 'Normal';
    if (bmi < 18.5) label = 'Underweight';
    else if (bmi < 25) label = 'Normal';
    else if (bmi < 30) label = 'Overweight';
    else label = 'Obese';
    return { bmi: bmi.toFixed(2), label };
  }, [heightCm, weightKg]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>BMI Calculator</Text>

      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        keyboardType="numeric"
        value={heightCm}
        onChangeText={setHeightCm}
      />
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        keyboardType="numeric"
        value={weightKg}
        onChangeText={setWeightKg}
      />

      <View style={styles.resultBox}>
        {bmiResult ? (
          <>
            <Text style={styles.resultText}>BMI: {bmiResult.bmi}</Text>
            <Text style={styles.resultText}>Category: {bmiResult.label}</Text>
          </>
        ) : (
          <Text style={styles.resultText}>Enter height and weight</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.clearButton}
        onPress={() => {
          setHeightCm('');
          setWeightKg('');
        }}
      >
        <Text style={styles.clearText}>Clear</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f7fb' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d8dbe2',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  resultBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginTop: 6,
  },
  resultText: { fontSize: 16, marginBottom: 6 },
  clearButton: {
    marginTop: 16,
    alignSelf: 'flex-start',
    backgroundColor: '#1f2937',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  clearText: { color: '#fff', fontWeight: '600' },
});
