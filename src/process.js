import { ClickDataStructure } from "./ds.js"
const getClicks = (clicks) => {
    let results = []
    const duplicateClicksMap = new Map()
    clicks.forEach(click => {
        if (duplicateClicksMap.has(click.ip)) {
            duplicateClicksMap.get(click.ip).add(click)
        } else {
            const clickDataStructure = new ClickDataStructure()
            clickDataStructure.add(click)
            duplicateClicksMap.set(click.ip, clickDataStructure)
        }
    })
    duplicateClicksMap.forEach(clickDataStructure => {
        //If there are more than 10 clicks for an IP in the overall array of clicks, do not include any of those clicks in the result set.
        if (clickDataStructure.getNumberOfDuplicateClicks() <= 10) {
            results = [...results, ...clickDataStructure.getClicks()]
        }
    })
    return results
}
export default getClicks
