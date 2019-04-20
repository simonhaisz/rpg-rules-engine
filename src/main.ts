import { runSimulation, SimuationResults } from "./core/simulation";
import { setLogLevel, LogLevel } from "./log";
import { streetSimulation as sr3Street, organizedCrimeSimulation as sr3OrganizedCrime } from "./systems/sr/sr3/simulation";
import { streetSimulation as sr5Street, organizedCrimeSimulation as sr5OrganizedCrime } from "./systems/sr/sr5/simulation";
import { streetSimulation as sr51Street, organizedCrimeSimulation as sr51OrganizedCrime } from "./systems/sr/sr5/simulation";

setLogLevel(LogLevel.Error);

const iterations = 10000;

const systemResults = new Map<string,SimuationResults>();
systemResults.set("SR3", runSimulation(
    iterations,
    sr3Street.createWorld,
    sr3Street.createGameMaster
));
systemResults.set("SR5", runSimulation(
    iterations,
    sr5Street.createWorld,
    sr5Street.createGameMaster
));
systemResults.set("SR5.1", runSimulation(
    iterations,
    sr51Street.createWorld,
    sr51Street.createGameMaster
));
logResults("Street", systemResults);
systemResults.clear();

systemResults.set("SR3", runSimulation(
    iterations,
    sr3OrganizedCrime.createWorld,
    sr3OrganizedCrime.createGameMaster
));
systemResults.set("SR5", runSimulation(
    iterations,
    sr5OrganizedCrime.createWorld,
    sr5OrganizedCrime.createGameMaster
));
systemResults.set("SR5.1", runSimulation(
    iterations,
    sr51OrganizedCrime.createWorld,
    sr51OrganizedCrime.createGameMaster
));
logResults("Organized Crime", systemResults);
systemResults.clear();

function logResults(simulation: string, systemResults: Map<string,SimuationResults>) {
    console.log(simulation);
    for (const system of systemResults.keys()) {
        console.log(system);
        const results = systemResults.get(system);
        if (!results) {
            throw new Error(`No results for system '${system}'`);
        }
        for (const winner of results.keys()) {
            const result = results.get(winner);
            if (!result) {
                throw new Error(`No result defined for winner '${winner}'`);
            }
            if (!result || result.count === 0) {
                continue;
            }
            const label = winner ? winner : "Draw";
            console.log(`${label}: ${JSON.stringify(result)}`);
        }
    }
    console.log();
}