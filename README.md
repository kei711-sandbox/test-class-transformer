```shell script
gibo dump JetBrains Node macOS Linux Windows > .gitignore

yarn init -y
yarn add -D typescript @types/node ts-node
tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --emitDecoratorMetadata --experimentalDecorators --sourceMap --noImplicitAny --declaration --strictPropertyInitialization false --target es2018 --lib dom,es2018 --module commonjs

yarn add -D jest ts-jest @types/jest
./node_modules/.bin/ts-jest config:init

yarn add reflect-metadata class-transformer class-validator

```
