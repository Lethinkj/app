import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Task = { id: string; title: string; detail: string };

export default function HomeScreen() {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Task | null>(null);

  const resetForm = () => {
    setTitle('');
    setDetail('');
    setEditingId(null);
  };

  const saveTask = () => {
    if (!title.trim()) return;
    if (editingId) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingId ? { ...t, title, detail } : t))
      );
    } else {
      setTasks((prev) => [{ id: Date.now().toString(), title, detail }, ...prev]);
    }
    resetForm();
  };

  const onEdit = (task: Task) => {
    setEditingId(task.id);
    setTitle(task.title);
    setDetail(task.detail);
  };

  const onDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (selected && selected.id === id) setSelected(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Daily Tasks</Text>

      <TextInput
        style={styles.input}
        placeholder="Task title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Task detail"
        value={detail}
        onChangeText={setDetail}
        multiline
      />
      <View style={styles.row}>
        <TouchableOpacity style={styles.saveBtn} onPress={saveTask}>
          <Text style={styles.btnText}>{editingId ? 'Update' : 'Add'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearBtn} onPress={resetForm}>
          <Text style={styles.btnText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No tasks</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => setSelected(item)}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              {!!item.detail && <Text style={styles.cardDetail}>{item.detail}</Text>}
            </TouchableOpacity>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => onEdit(item)}>
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onDelete(item.id)}>
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {selected && (
        <View style={styles.detailBox}>
          <Text style={styles.detailTitle}>View Task</Text>
          <Text style={styles.detailLine}>Title: {selected.title}</Text>
          <Text style={styles.detailLine}>Detail: {selected.detail || '-'}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#eef2ff' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 14 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c7d2fe',
    padding: 10,
    marginBottom: 10,
  },
  multiline: { minHeight: 70, textAlignVertical: 'top' },
  row: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  saveBtn: {
    flex: 1,
    backgroundColor: '#1e40af',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearBtn: {
    flex: 1,
    backgroundColor: '#334155',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '600' },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: { fontWeight: '700', marginBottom: 4 },
  cardDetail: { color: '#475569' },
  actions: { flexDirection: 'row', gap: 16, marginTop: 6 },
  actionText: { color: '#1d4ed8' },
  empty: { color: '#6b7280' },
  detailBox: {
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  detailTitle: { fontWeight: '700', marginBottom: 6 },
  detailLine: { marginBottom: 4 },
});
