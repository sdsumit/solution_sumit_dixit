/**
 * This datastructure is used for storing map periodClickMap and numberOfDuplicateClicks
 * periodClickMap is used to store clicks against every possible period
 */
export class ClickDataStructure {
    constructor() {
        this.periodClickMap = new Map()
        this.numberOfDuplicateClicks = 0
    }
    add(duplicateClick) {
        this.numberOfDuplicateClicks++
        const hour = duplicateClick.timestamp.split(' ')[1].split(':')[0]
        if (this.periodClickMap.has(hour)) {
            this.periodClickMap.get(hour).push(duplicateClick)
        } else {
            this.periodClickMap.set(hour, [duplicateClick])
        }

    }
    getNumberOfDuplicateClicks() {
        return this.numberOfDuplicateClicks
    }
    getClicks() {
        const clicks = []
        this.periodClickMap.forEach(v => {
            v.sort((click1, click2) => {
                if (click1.amount === click2.amount) return new Date(click1.timestamp) - new Date(click2.timestamp)
                return click2.amount - click1.amount
            })
            // We can remove this if block if expected result is earliest of most expensive clicks is
            if(v.length > 1 && v[0].amount === v[1].amount){
                const earliestClick = v.reduce((earliest, click) => {
                    if(new Date(earliest.timestamp) > new Date(click.timestamp)) earliest = click
                    return earliest
                },v[0])
                clicks.push(earliestClick)
            }else{
                clicks.push(v[0])
            }
            
        })
        return clicks
    }
}