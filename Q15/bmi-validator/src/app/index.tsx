import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [error, setError] = useState('');

  const result = useMemo(() => {
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

  const validate = () => {
    const h = parseFloat(heightCm);
    const w = parseFloat(weightKg);
    if (!h || !w) return 'Both values are required.';
    if (h < 50 || h > 250) return 'Height must be between 50 and 250 cm.';
    if (w < 10 || w > 300) return 'Weight must be between 10 and 300 kg.';
    return '';
  };

  const onCalculate = () => {
    const msg = validate();
    setError(msg);
  };

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

      <TouchableOpacity style={styles.calcBtn} onPress={onCalculate}>
        <Text style={styles.calcText}>Calculate</Text>
      </TouchableOpacity>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : result ? (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>BMI: {result.bmi}</Text>
          <Text style={styles.resultText}>Category: {result.label}</Text>
        </View>
      ) : (
        <Text style={styles.helper}>Enter values and tap Calculate</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8fafc' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 18 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#cbd5f5',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  calcBtn: {
    backgroundColor: '#111827',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  calcText: { color: '#fff', fontWeight: '600' },
  error: { color: '#b91c1c', marginTop: 10 },
  helper: { color: '#6b7280', marginTop: 10 },
  resultBox: {
    marginTop: 12,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  resultText: { fontSize: 16, marginBottom: 6 },
});
