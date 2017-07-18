const imageDiff = require('image-diff');
const download = require('download-file');
const path = require('path');
const fs = require('fs');

export default class ImageUtils {
    static areEqual(imageA, imageB, deleteAfterCompare): Promise<boolean> {
        return new Promise((resolve, reject) => {
            imageDiff({
                actualImage: imageA,
                expectedImage: imageB,
            }, (err, imagesAreSame) => {
                if (deleteAfterCompare !== false) {
                    fs.unlinkSync(imageA);
                    fs.unlinkSync(imageB);
                }
                if (err) {
                    reject(err);
                }
                if (imagesAreSame) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    static test() {
        return ImageUtils.areImagesAtUrlEqual('https://scontent.fblr1-1.fna.fbcdn.net/v/t1.0-9/20031770_153501435207689_8144478725024925337_n.jpg?oh=1216af318595437f073d017d1c1655dd&oe=5A0663AE', 'https://scontent.fblr1-1.fna.fbcdn.net/v/t1.0-9/20031770_153501435207689_8144478725024925337_n.jpg?oh=1216af318595437f073d017d1c1655dd&oe=5A0663AE')
            .then(result => {
                return result;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static downloadFile(url, filename) {
        return new Promise((resolve, reject) => {
            const directory = path.resolve('./__directoryForImageComparision/');
            download(url, {
                directory,
                filename
            }, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(directory + "/" + filename);
                }
            });
        });
    }


    static areImagesAtUrlEqual(urlA, urlB): Promise<boolean> {
        const imagePromiseA = ImageUtils.downloadFile(urlA, 'image1.jpg');
        const imagePromiseB = ImageUtils.downloadFile(urlB, 'image2.jpg');
        return Promise.all([imagePromiseA, imagePromiseB])
            .then(values => {
                const imageAPath = values[0];
                const imageBPath = values[1];
               return ImageUtils.areEqual(imageAPath, imageBPath, true);
            });
    }

}