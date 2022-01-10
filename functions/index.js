const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.getAllPosts = functions.https.onRequest(async (resquest,response)=>{
    const snapshot = await firestore.collection('posts').get();
    const posts = snapshot.docs.map(doc=>({id:doc.id, ...doc.data()}));
    response.json({posts});
});

exports.sanitizeContent = functions.firestore.document(`posts/{postId}`).onWrite(async (change)=>{
    if (!change.after.exists) return;   // doc will not exists if its deleted so it cover both update and create as well
    
    const {content , sanitized } = change.after.data();   // change is just like the snapshot 
    // sanitized is jut some thing which if true can trigger this condition and return something otherwise it returns null and we can get out of 
    // recursion  
    /// These change functions should always return something otherwise they create errors and problems like recursion
    if(change && !sanitized){
        return change.after.ref.update({
            content: content.replace(/CofeeScript/g,"**********" ),
            sanitized: true,
        })
    } 

    // if there was no content just return null
    return null;
});

exports.incrementCommentCount = functions.firestore.document("posts/{postId}/comments/{commentId}").onCreate(async (snapshot, context) => {
    const {postId} = context.params;
    const postRef = firestore.doc(`posts/${postId}`);
    const snap = await postRef.get('comments');
    const comments = snap.get('comments');
    return postRef.update({comments: comments+1});
})

 