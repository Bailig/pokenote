import * as firebase from 'firebase';

export const fetch = ref => new Promise(async (resolve, reject) => {
  try {
    const snapshot = await firebase.database().ref(ref).once('value');
    resolve(snapshot.val());
  } catch (error) {
    reject(error);
  }
});
