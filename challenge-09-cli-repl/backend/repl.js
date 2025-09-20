#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Data storage
const dataFile = path.join(__dirname, 'data.json');
let data = {};

// Load data from file
function loadData() {
  try {
    if (fs.existsSync(dataFile)) {
      const fileContent = fs.readFileSync(dataFile, 'utf8');
      data = JSON.parse(fileContent);
    }
  } catch (error) {
    console.error('Error loading data:', error.message);
    data = {};
  }
}

// Save data to file
function saveData() {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving data:', error.message);
  }
}

// REPL interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'repl> '
});

// Available commands
const commands = {
  help: {
    description: 'Show available commands',
    usage: 'help',
    handler: () => {
      console.log('\nAvailable commands:');
      console.log('==================');
      Object.entries(commands).forEach(([name, cmd]) => {
        console.log(`${name.padEnd(12)} - ${cmd.description}`);
        console.log(`             Usage: ${cmd.usage}`);
      });
      console.log('');
    }
  },

  create: {
    description: 'Create a new item',
    usage: 'create <key> <value>',
    handler: (args) => {
      if (args.length < 2) {
        console.log('Usage: create <key> <value>');
        return;
      }
      const key = args[0];
      const value = args.slice(1).join(' ');
      data[key] = {
        value,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      saveData();
      console.log(`Created: ${key} = ${value}`);
    }
  },

  get: {
    description: 'Get value by key',
    usage: 'get <key>',
    handler: (args) => {
      if (args.length < 1) {
        console.log('Usage: get <key>');
        return;
      }
      const key = args[0];
      if (data[key]) {
        console.log(`${key}: ${data[key].value}`);
        console.log(`  Created: ${data[key].createdAt}`);
        console.log(`  Updated: ${data[key].updatedAt}`);
      } else {
        console.log(`Key '${key}' not found`);
      }
    }
  },

  list: {
    description: 'List all items',
    usage: 'list [pattern]',
    handler: (args) => {
      const pattern = args.length > 0 ? args[0] : '';
      const regex = new RegExp(pattern, 'i');
      
      const matchingKeys = Object.keys(data).filter(key => regex.test(key));
      
      if (matchingKeys.length === 0) {
        console.log('No items found');
        return;
      }
      
      console.log(`\nFound ${matchingKeys.length} item(s):`);
      console.log('=' .repeat(50));
      matchingKeys.forEach(key => {
        const item = data[key];
        console.log(`${key.padEnd(20)} | ${item.value}`);
        console.log(`${''.padEnd(20)} | Created: ${item.createdAt}`);
        console.log(`${''.padEnd(20)} | Updated: ${item.updatedAt}`);
        console.log('-'.repeat(50));
      });
    }
  },

  update: {
    description: 'Update an existing item',
    usage: 'update <key> <new-value>',
    handler: (args) => {
      if (args.length < 2) {
        console.log('Usage: update <key> <new-value>');
        return;
      }
      const key = args[0];
      const newValue = args.slice(1).join(' ');
      
      if (!data[key]) {
        console.log(`Key '${key}' not found. Use 'create' to add new items.`);
        return;
      }
      
      const oldValue = data[key].value;
      data[key] = {
        ...data[key],
        value: newValue,
        updatedAt: new Date().toISOString()
      };
      saveData();
      console.log(`Updated: ${key}`);
      console.log(`  Old value: ${oldValue}`);
      console.log(`  New value: ${newValue}`);
    }
  },

  delete: {
    description: 'Delete an item',
    usage: 'delete <key>',
    handler: (args) => {
      if (args.length < 1) {
        console.log('Usage: delete <key>');
        return;
      }
      const key = args[0];
      
      if (!data[key]) {
        console.log(`Key '${key}' not found`);
        return;
      }
      
      delete data[key];
      saveData();
      console.log(`Deleted: ${key}`);
    }
  },

  clear: {
    description: 'Clear all items',
    usage: 'clear',
    handler: () => {
      const count = Object.keys(data).length;
      data = {};
      saveData();
      console.log(`Cleared ${count} item(s)`);
    }
  },

  stats: {
    description: 'Show statistics',
    usage: 'stats',
    handler: () => {
      const keys = Object.keys(data);
      console.log('\nStatistics:');
      console.log('===========');
      console.log(`Total items: ${keys.length}`);
      
      if (keys.length > 0) {
        const totalSize = JSON.stringify(data).length;
        console.log(`Total size: ${totalSize} bytes`);
        
        const oldest = Math.min(...keys.map(key => new Date(data[key].createdAt).getTime()));
        const newest = Math.max(...keys.map(key => new Date(data[key].createdAt).getTime()));
        
        console.log(`Oldest item: ${new Date(oldest).toISOString()}`);
        console.log(`Newest item: ${new Date(newest).toISOString()}`);
      }
      console.log('');
    }
  },

  export: {
    description: 'Export data to file',
    usage: 'export <filename>',
    handler: (args) => {
      if (args.length < 1) {
        console.log('Usage: export <filename>');
        return;
      }
      const filename = args[0];
      try {
        fs.writeFileSync(filename, JSON.stringify(data, null, 2));
        console.log(`Data exported to: ${filename}`);
      } catch (error) {
        console.log(`Error exporting data: ${error.message}`);
      }
    }
  },

  import: {
    description: 'Import data from file',
    usage: 'import <filename>',
    handler: (args) => {
      if (args.length < 1) {
        console.log('Usage: import <filename>');
        return;
      }
      const filename = args[0];
      try {
        if (!fs.existsSync(filename)) {
          console.log(`File '${filename}' not found`);
          return;
        }
        const fileContent = fs.readFileSync(filename, 'utf8');
        const importedData = JSON.parse(fileContent);
        
        // Merge with existing data
        Object.assign(data, importedData);
        saveData();
        console.log(`Data imported from: ${filename}`);
        console.log(`Total items now: ${Object.keys(data).length}`);
      } catch (error) {
        console.log(`Error importing data: ${error.message}`);
      }
    }
  },

  exit: {
    description: 'Exit the REPL',
    usage: 'exit',
    handler: () => {
      console.log('Goodbye!');
      process.exit(0);
    }
  },

  quit: {
    description: 'Exit the REPL (alias for exit)',
    usage: 'quit',
    handler: commands.exit.handler
  }
};

// Command execution
function executeCommand(input) {
  const parts = input.trim().split(/\s+/);
  const commandName = parts[0].toLowerCase();
  const args = parts.slice(1);

  if (!commandName) {
    return;
  }

  const command = commands[commandName];
  if (!command) {
    console.log(`Unknown command: ${commandName}`);
    console.log('Type "help" for available commands');
    return;
  }

  try {
    command.handler(args);
  } catch (error) {
    console.log(`Error executing command: ${error.message}`);
  }
}

// Main REPL loop
function startREPL() {
  console.log('Welcome to the Interactive REPL!');
  console.log('Type "help" for available commands or "exit" to quit.');
  console.log('');

  loadData();

  rl.prompt();

  rl.on('line', (input) => {
    executeCommand(input);
    rl.prompt();
  });

  rl.on('close', () => {
    console.log('\nGoodbye!');
    process.exit(0);
  });

  // Handle Ctrl+C gracefully
  process.on('SIGINT', () => {
    console.log('\n\nGoodbye!');
    process.exit(0);
  });
}

// Start the REPL
if (require.main === module) {
  startREPL();
}

module.exports = { startREPL, executeCommand, commands };
