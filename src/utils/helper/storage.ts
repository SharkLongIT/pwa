import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Set Data into persistent storage
 * @param key PERSISTENT KEY
 * @returns nothing
 */
export const setData = async (key: string, value: any): Promise<void> => {
  try {
    if (value === undefined || null) {
      await AsyncStorage.removeItem(key);
    } else {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * Clear Data from persistent storage
 * @param key PERSISTENT KEY
 * @returns nothing
 */
export const clearData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Get Data from persistent storage
 * @param key PERSISTENT KEY
 * @returns data stored with given key
 */
export const getData = async (key: string): Promise<any> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (!value) {
      return;
    }

    return JSON.parse(value);
  } catch (error) {
    console.error(error);
  }
};

// Clear all data in storage
export const clearAllStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('Clear all data in storage successfully');
  } catch (error) {
    console.log(`Clear all data in storage failed ${error}`);
  }
};
