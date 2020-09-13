# Description

Follow https://medium.com/swlh/snake-game-with-rust-javascript-and-webassembly-part-2-9d729b87c186?source=---------2------------------ this tutorial to create the classic snake game in browser using Web Assembly and Rust.

# Structure

Core game logic is written in rust under the `src/lib.rs` file.
View Render is HTML5 canvas written in `www/view.js`
Game Manager is in JS under the `www/game-manager.js` file.

# How to build

1.) First make sure you have `rust` and `wasm-pack` installed
2.) `wasm-pack build` to build to compile rust code.
3.) `npm install` `npm run start` under the `www` directory to run game.
