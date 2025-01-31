import Player from "./player";

export default class UI {
    constructor() {
        this.saveButton = p5.createButton('Save best player')
        this.loadPlayer = p5.createButton('Load best player')
        this.saveProgress = p5.createButton('Save actual generation')
        this.loadProgress = p5.createButton('Load generation')
        this.show()
    }

    show() {
        // Save 
        this.saveButton.position(20, canvasHeight+10);
        this.saveButton.elt.addEventListener('click', this.savePlayer);
        
        // Load
        this.loadPlayer.position(20, canvasHeight+40);
        this.loadPlayer.elt.addEventListener('click', this.loadPlayerFile);
        
        // Save progress
        this.saveProgress.position(20, canvasHeight+100);
        this.saveProgress.elt.addEventListener('click', this.saveGeneration);
        
        // Load Progress
        this.loadProgress.position(20, canvasHeight+130);
        this.loadProgress.elt.addEventListener('click', this.loadGenerationFile);
    }

    savePlayer() {
        p5.saveJSON(generation.getBetterSpecimen().brain.layers_weights.map(layer =>  layer.dataSync()), 'bestSpecimen.json');
    }

    loadPlayerFile() {
        p5.loadJSON('bestSpecimen.json', (data) => {
            // Create a generation
            const arrayData = data.map(layer => Object.keys(layer).map(value => layer[value]))
            generation.runFromPlayerData(arrayData, Player)
        });
    }

    saveGeneration() {
        p5.saveJSON({
            generation: generation.generation,
            population: generation.population,
            species: generation.species.map(speciment => speciment.brain.layers_weights.map(layer =>  layer.dataSync()))
        }, 'generation.json');
    }

    loadGenerationFile(file) {
        
        p5.loadJSON('generation.json', (data) => {
            // Create a generation
            const generationNumber = data.generation
            const population = data.population
            const arrayData = data.species.map(specimen => specimen.map(layer => Object.keys(layer).map(value => layer[value])))
            generation.runFromGenerationData(arrayData, generationNumber, population, Player)
        });
    }
}