import type { JournalEntry } from '../types';

const ENTRIES_KEY = 'moonlit-thoughts-entries';

export const getEntries = async (): Promise<JournalEntry[]> => {
  const entriesJson = localStorage.getItem(ENTRIES_KEY);
  if (!entriesJson) return [];
  
  const entries = JSON.parse(entriesJson);
  return entries.sort((a: JournalEntry, b: JournalEntry) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const saveEntry = async (entry: JournalEntry): Promise<void> => {
  const entries = await getEntries();
  const existingIndex = entries.findIndex(e => e.id === entry.id);
  
  if (existingIndex > -1) {
    entries[existingIndex] = entry;
  } else {
    entries.push(entry);
  }
  
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
};

export const deleteEntry = async (id: string): Promise<void> => {
  const entries = await getEntries();
  const filteredEntries = entries.filter(e => e.id !== id);
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(filteredEntries));
};
