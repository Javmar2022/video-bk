const mongoose = require('mongoose');

const getConnection = async () => {


    try {

        const url = 'mongodb://uservideos:BqhzmNoEMthJNHac@ac-optfqry-shard-00-00.oakaxck.mongodb.net:27017,ac-optfqry-shard-00-01.oakaxck.mongodb.net:27017,ac-optfqry-shard-00-02.oakaxck.mongodb.net:27017/video-iud?ssl=true&replicaSet=atlas-qiu5hu-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'


        await mongoose.connect(url);

        console.log('Conexion Exitosa');


    } catch (error) {

        console.log(error);
    }


}

module.exports = {
    getConnection,
}

