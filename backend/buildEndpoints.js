const fs = require('node:fs');
const path = require('node:path');

const commands = [];

// Collect all the command folders from the endpoints directory
const foldersPath = path.join(__dirname, 'endpoints');
const commandFolders = fs.readdirSync(foldersPath);

async function registerEndpoint(commandName, command, req, res) {
    try {
        const result = await command.execute(req, res);
        res.json(result);
    } catch (error) {
        console.error(`Error in endpoint ${commandName}:`, error);
        res.status(500).send('Internal server error');
    }
}

function deploy(app) {
    for (const folder of commandFolders) {
        // Collect all the command files from the endpoints directory
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
    
            if ('endpoint' in command && 'execute' in command) {
                const commandName = `/${folder}/${command.endpoint}`;
                console.log(`adding endpoint ${commandName}`)
                
                switch (command.route) {
                    case('get'):
                        app.get(commandName, async (req, res) => {
                            await registerEndpoint(commandName, command, req, res);
                        });
                    break;

                    case('post'):
                        app.post(commandName, async (req, res) => {
                            await registerEndpoint(commandName, command, req, res);
                        });
                    break;

                    default:
                        console.error(`failed to register endpoint ${commandName}, property "route" is missing or improperly formatted`)

                }
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "endpoint" or "execute" property.`);
            }
        }
    }
}



module.exports = { deploy };