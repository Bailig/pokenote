import * as firebase from 'firebase';

export const fetchDownloadURL = ref => new Promise(async (resolve, reject) => {
  try {
    const url = await firebase.storage().ref(ref).getDownloadURL();
    resolve(url);
  } catch (error) {
    reject(error);
  }
});
