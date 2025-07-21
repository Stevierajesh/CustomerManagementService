const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        app: './src/app.js',
        auth: './src/auth.js',
        login: './src/login.js',
        routing: './src/routing.js',
        system: './src/system.js',
        embed: './src/embed.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/js')
        
    }
}
