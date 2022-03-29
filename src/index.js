import { clicksJson } from "./clicks.js"
import getClicks from "./process.js"

console.log(JSON.stringify(getClicks(clicksJson)))