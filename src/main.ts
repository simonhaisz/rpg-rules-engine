import { runSimulation, SimuationResults } from "./core/simulation";
import { setLogLevel, LogLevel } from "./log";
import { createSR3_StreetWorld, createSR3_OrganizedCrimeWorld, createSR3_CorporateWorld } from "./systems/sr/sr3/world";
import { createSR5_StreetWorld, createSR5_OrganizedCrimeWorld, createSR5_CorporateWorld } from "./systems/sr/sr5/world";
import { createSR5_1_StreetWorld, createSR5_1_OrganizedCrimeWorld, createSR5_1_CorporateWorld } from "./systems/sr/sr5.1/world";
import { createSR3_GameMaster } from "./systems/sr/sr3/gamemaster";
import { createSR5_GameMaster } from "./systems/sr/sr5/gamemaster";
import { createSR5_1_GameMaster } from "./systems/sr/sr5.1/gamemaster";

setLogLevel(LogLevel.Error);

const iterations = 10000;

const systemResults = new Map<string,SimuationResults>();

systemResults.set("SR3", runSimulation(
    iterations,
    createSR3_StreetWorld,
    createSR3_GameMaster
));
systemResults.set("SR5", runSimulation(
    iterations,
    createSR5_StreetWorld,
    createSR5_GameMaster
));
systemResults.set("SR5.1", runSimulation(
    iterations,
    createSR5_1_StreetWorld,
    createSR5_1_GameMaster
));
logResults("Street", systemResults);
systemResults.clear();

systemResults.set("SR3", runSimulation(
    iterations,
    createSR3_OrganizedCrimeWorld,
    createSR3_GameMaster
));
systemResults.set("SR5", runSimulation(
    iterations,
    createSR5_OrganizedCrimeWorld,
    createSR5_GameMaster
));
systemResults.set("SR5.1", runSimulation(
    iterations,
    createSR5_1_OrganizedCrimeWorld,
    createSR5_1_GameMaster
));
logResults("Organized Crime", systemResults);
systemResults.clear();

systemResults.set("SR3", runSimulation(
    iterations,
    createSR3_CorporateWorld,
    createSR3_GameMaster
));
systemResults.set("SR5", runSimulation(
    iterations,
    createSR5_CorporateWorld,
    createSR5_GameMaster
));
systemResults.set("SR5.1", runSimulation(
    iterations,
    createSR5_1_CorporateWorld,
    createSR5_1_GameMaster
));
logResults("Corporate", systemResults);
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