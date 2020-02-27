const express = require('express');
const path = require("path")
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


const port = process.env.PORT || 4000;
const routes = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

function afterExecution(res, conn, msg){
    res.json(msg);
    conn.end();
    res.end();
}

routes.route('/listdir/:id').get(function (req, res) {
    var Client = require('ssh2').Client;
    var connSettings = {
        host: '192.168.43.185',
        port: 22, // Normal is 22 port
        username: 'vikramsftp',
        password: 'vikramsftp123'
        // You can use a key file too, read the ssh2 documentation
    };
    var remotePathToList = path.join('/', req.params.id.split(',').join('/'));
    console.log("test", remotePathToList);

    var conn = new Client();
    conn.on('ready', function () {
        console.log("Connected");
        conn.sftp(function (err, sftp) {
            if (err) {
                afterExecution(res, conn, err);
            }

            sftp.readdir(remotePathToList, function (err, list) {
                if (err) {
                    // afterExecution(res, conn, err);
                    res.status(404).send('not found');
                }
                // List the directory in the console
                conn.end();
                res.send(list);
                // Do not forget to close the connection, otherwise you'll get troubles
            });
        })
    }).connect(connSettings);
});


app.use('/api', routes);
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.listen(port, function () {
    console.log("Server is running on Port: " + port);
});