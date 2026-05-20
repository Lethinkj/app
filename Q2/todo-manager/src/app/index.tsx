import React, { useMemo, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState<{ id: string; text: string; done: boolean }[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const canSave = useMemo(() => taskText.trim().length > 0, [taskText]);

  const onAddOrUpdate = () => {
    if (!canSave) return;
    if (editingId) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingId ? { ...t, text: taskText } : t))
      );
      setEditingId(null);
    } else {
      setTasks((prev) => [
        { id: Date.now().toString(), text: taskText, done: false },
        ...prev,
      ]);
    }
    setTaskText('');
  };

  const onEdit = (task: { id: string; text: string; done: boolean }) => {
    setEditingId(task.id);
    setTaskText(task.text);
  };

  const onDelete = (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const onToggle = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>To-Do Manager</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Enter task"
          value={taskText}
          onChangeText={setTaskText}
        />
        <TouchableOpacity style={styles.addBtn} onPress={onAddOrUpdate}>
          <Text style={styles.addBtnText}>{editingId ? 'Update' : 'Add'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No tasks yet</Text>}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity onPress={() => onToggle(item.id)}>
              <Text style={[styles.itemText, item.done && styles.itemDone]}>
                {item.text}
              </Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f3f4f6' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
  row: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 10,
  },
  addBtn: {
    backgroundColor: '#111827',
    paddingHorizontal: 14,
    justifyContent: 'center',
    borderRadius: 8,
  },
  addBtnText: { color: '#fff', fontWeight: '600' },
  item: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: { fontSize: 16 },
  itemDone: { textDecorationLine: 'line-through', color: '#6b7280' },
  actions: { flexDirection: 'row', gap: 16, marginTop: 8 },
  actionText: { color: '#2563eb' },
  empty: { color: '#6b7280' },
});
