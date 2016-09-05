



module.exports.loop = function () {
 
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
//var spawner = require('spawner');
var debugging = require('debugging.script');
var creepcounter = require('creep.counter');




    // Always place this memory cleaning code at the very top of your main loop!

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], null, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
    console.log(Game.time);

    

    for(var name in Game.rooms) {
        console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');

    }   
}

