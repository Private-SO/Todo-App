import firebase from "firebase";
import "@firebase/firestore";

class Fire {
  getLists(callback) {
    let ref = this.ref.orderBy("name");
    this.unsubscribe = ref.onSnapshot((snapshot) => {
      lists = [];
      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });
      callback(lists);
    });
  }
  addList(list) {
    let ref = this.ref;
    ref.add(list);
  }
  updateList(list) {
    let ref = this.ref;
    ref.doc(list.id).update(list);
  }
  get userId() {
    return firebase.auth().currentUser.uid;
  }

  get ref() {
    return firebase
      .firestore()
      .collection("users")
      .doc(this.userId)
      .collection("lists");
  }
  detach() {
    this.unsubscribe();
  }
}

export default Fire;
