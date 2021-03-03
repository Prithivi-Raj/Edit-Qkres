const dotenv = require("dotenv");
dotenv.config();
const aws = require("aws-sdk");
const stream = require("stream");

aws.config.update({
    region:process.env.AWS_REGION,
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_KEY
})

function fileDownloadController(){
    return{
        index(req,res){
            console.log(req.params.fileName);
            const s3 = new aws.S3();
            let downloadParams = {
                Bucket:process.env.AWS_BUCKETNAME,
                Key:req.params.fileName
            }
            s3.getObject(downloadParams)
            .createReadStream()
              .on('error', function(err){
                res.status(500).json({error:"Error ->file not found ,cancel the order " + err});
            }).pipe(res);

        }
    }
}

module.exports = fileDownloadController