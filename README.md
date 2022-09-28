requirements:
```
node >= 14, tested on v14.18.2
```

install:
```
git clone git@github.com:mrLandyrev/google-permissions-cli.git

cd google-permissions-cli

add your google account json file google-service-account.json to root

npm ci
```

usage:
```
npm run add $fileId $email $role(writer | reader | owner, default=writer)
```
