import { runSimulation } from "./core/simulation";
import { setLogLevel, LogLevel } from "./log";
import { standardSimulation as sr3StandardSimulation } from "./systems/sr/sr3/simulation";

// setLogLevel(LogLevel.Debug);

const sr3Result = runSimulation(
    10000,
    sr3StandardSimulation.createWorld,
    sr3StandardSimulation.createGameMaster
);

for (const winner of sr3Result.keys()) {
    const result = sr3Result.get(winner);
    const label = winner ? winner : "Draw";
    console.log(`${label}: ${JSON.stringify(result)}`);
}