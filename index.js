const { fileCopy } = require('./fs-copy');
const { fileRead, fileWrite } = require('./fs-promise'); 
const readline = require('readline');

const greenDomains = [
    
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'

];

const orangeDomains = [

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'

];

const affids = [1010, 13, 1369, 1370, 1391, 1397, 1400, 1451, 1454, 1455, 1473, 1502, 1623, 1630, 1631, 1632, 1705, 183, 211, 309, 609];

const getFilePath = () => {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        const filePath = rl.question('Enter The File Path: ', (filePath)=> {
            rl.close();
            resolve(filePath);
        });
    });
};


const getUnsub = (filePath) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const input = rl.question('Enter The Advertiser Unsubscribe URL: ', (url) => {
        findNReplace(filePath, /#unsub#/g, url);
        fileRead(filePath).then((content) => {
            const regex = /#unsub#/g;
            if (regex.test(content)) {
                const unsubURL = content.replace(regex, url);
                fileWrite(filePath, unsubURL).then((data) => {});
                for (let i = 0; i < affids.length; i++) {
                    fileCopy(filePath, `${filePath.substring(0, filePath.length -5)}-${affids[i]}.html`).then((e) => {
                        domainAdder(`${filePath.substring(0, filePath.length -5)}-${affids[i]}.html`, greenDomains, orangeDomains); 
                    });
                };
            };
        });
        rl.close();
    });
};

const findNReplace = (file, regex, replaced) => {
    fileRead((file)).then((content) => {
        if (regex.test(content)) {
            fileWrite(file, content.replace(regex, replaced)).then(() => {});
        }
    });
};

const domainAdder = (file, green, orange) => {
    const domainList = green.concat(orange);
    for (let i = 0; i < domainList.length; i++) {
        if (file.split('-')[1].split('.')[0] === domainList[i].split('=')[1].split('&')[0]) {
            findNReplace( file, /#url<c=/g, domainList[i] );
        };
    };
};

getFilePath().then((filePath) => {
    fileRead(filePath).then((content) => {
        const regex = /s1=>#/g;
        if (regex.test(content)) {
            const result = content.replace(regex, 's1=')
            fileWrite(filePath, result).then((data) => {
                fileRead(filePath).then((content) => {
                    const regex = /<img\s{1,}src="0jhkanbe9mxp.jpg"\s{1,}border="0"\s{1,}style="max-width:100%;max-height:100%;display:block;padding:0px;margin:0px;">/g;
                    if (regex.test(content)) {
                        const result = content.replace(regex, '')
                        fileWrite(filePath, result).then((data) => {
                            getUnsub(filePath);
                        });
                    };
                });
            });
        };
    });
});

/*
getFilePath().then((filePath) => {
    findNReplace(filePath, /<img\s{1,}src="0jhkanbe9mxp.jpg"\s{1,}border="0"\s{1,}style="max-width:100%;max-height:100%;display:block;padding:0px;margin:0px;">/g, '');
    findNReplace(filePath, /s1=>#/g, 's1=');
    getUnsub(filePath);
});
*/
