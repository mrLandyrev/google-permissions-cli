import * as gapis from 'googleapis';
import * as util from 'util';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question = util.promisify(rl.question).bind(rl);

(async () => {
    const spreadSheetId = process.argv[2];
    const email = process.argv[3];
    const permission = process.argv[4] ?? 'writer';

    const answer = await question(`Add\npermission: ${permission}\nfor file: ${spreadSheetId}\nto email: ${email}\nis correct?\n(y\\n)`);
    rl.close();

    if (answer !== 'y') {
        console.log('"y" is not reconized... abort');
        return;
    }

    console.log('prcessing...');

    try {
        const auth = new gapis.google.auth.GoogleAuth({
            keyFile: 'google-service-account.json',
            scopes: [
                'https://www.googleapis.com/auth/documents',
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/spreadsheets',
            ],
        });
        const authClient = await auth.getClient();

        const drive = gapis.google.drive({
            version: 'v2',
            auth: authClient,
        });

       await drive.permissions.insert({
            fileId: spreadSheetId,
            requestBody: {
                role: permission,
                type: 'user',
                value: email,
            }
        });

        console.log('done!');
    } catch (e){
        console.log('Same error was found... abort');
        console.log(e);
    }
})();
