const { admin, db, storage } = require('../util/admin');
const config = require('../util/config');

const firebase = require('firebase');
// firebase.initializeApp(config);

//firebase functions:shell
//api('/getImage/frjiDkc6c1bN8bQzjgEFgmCfKAt2%2FQM5ffiEAEH8fKeoL9JP9%2F2?code=foo')
//api('/getImage/frjiDkc6c1bN8bQzjgEFgmCfKAt2%2FQM5ffiEAEH8fKeoL9JP9%2F2?code=1590096428335')
exports.getImage = async (request, response) => {
    const code = request.query.code;
    const path = request.params.path
    console.log(path)
    // user / collection / index
    if( ! path.match('^[a-zA-Z0-9]+\/[a-zA-Z0-9]+\/[0-9]+$')) {
        response.status(422).send()
       return;
    }
    

    const [user, collection, index] = path.split('/')

    console.log("/getImage code2: ", code, " with user: ", user,
         "and collection: ", collection, "and index: ", index)
    const docPath = "/users/"+user+"/collections/"+collection;
    let doc = await db.doc(docPath).get()
    
    try {
        var sharingLinks = doc.data().sharingLinks
        console.log("sharing links: ", sharingLinks)
        if( sharingLinks.includes(parseInt(code)) ) {
            var paths = doc.data().paths
            console.log("paths: ", paths)
            var imageRef = paths[parseInt(index)-1];
            console.log ("returning ", imageRef)
            if(imageRef === undefined) {
                response.status(401).send()
            }
            let workDoc = await db.doc("/users/"+user+"/works/"+imageRef).get()
            var filename = workDoc.data().filename+"_200x200";
            console.log(filename)
            var bucket = storage.bucket();
            // console.log(bucket)
            bucket.getFiles().then((buckets) => {
                buckets.forEach(bucket => {
                    // console.log(bucket);
                  });
            })
            // console.log(storage.ref())

            // console.log(storage.child(filename).getMetadata)

            response.status(200).send();
            return true;
        } else {
            console.log("no code match")
            throw new Error("no code match");
        }
    } catch (error) {
        response.status(500).send();
        console.log(error)
    }

};